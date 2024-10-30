import {
  React, type AllWidgetProps,
  type IMDataSourceInfo,
  type DataSource,
  DataSourceStatus,
  type FeatureLayerQueryParams,
  DataSourceComponent,
  type FeatureLayerDataSource,
  type ImmutableArray,
  FormattedMessage
} from 'jimu-core'
import { type IMConfig } from '../config'
import { Button, Select, Option, Alert, Loading, Label } from 'jimu-ui'
import type FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import type CodedValueDomain from '@arcgis/core/layers/support/CodedValueDomain.js'
import Esri = __esri
import defaultMessages from './translations'

const { useState, useEffect } = React

interface ValidationResult {
  total: number
  errorCount: number
  successful: number
}

interface FieldEntry {
  name: string
  alias: string
  domain: CodedValueDomain
}
type FieldArray = FieldEntry[]

interface NewValues {
  [key: string]: string | number | null
}
const LEAVE_EXISTING_VALUES = '|__LEAVE EXISTING VALUES__|'
const SET_TO_NULL = '|__SET TO NULL__|'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [dataSource, setDataSource] = useState<DataSource | undefined>(undefined)
  const [newValues, setNewValues] = useState<NewValues>({})
  const [fieldsToUpdate, setFieldsToUpdate] = useState<FieldArray>([])
  const [selectionCount, setSelectionCount] = useState<number>(0)
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<ImmutableArray<string> | string[]>()
  const [editableFeatureLayer, setEditableFeatureLayer] = useState<FeatureLayer>()
  const [widgetIsBusy, setWidgetIsBusy] = useState<boolean>(true)
  const [alertState, setAlertState] = useState<{ type: 'success' | 'warning' | 'error' | null, message: string }>({ type: null, message: '' })
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (alertState.type && alertState.type === 'success') {
      const timer = setTimeout(() => { setFadeOut(true) }, 10000)
      const fadeTimer = setTimeout(() => { setAlertState({ type: null, message: '' }) }, 10500)
      return () => {
        clearTimeout(timer)
        clearTimeout(fadeTimer)
      }
    }
  }, [alertState])

  const isDsConfigured = () => {
    if (props.useDataSources &&
      props.useDataSources.length === 1 &&
      props.useDataSources[0].fields &&
      props.useDataSources[0].fields.length > 0
    ) {
      return true
    }
    return false
  }

  const handleSelectedCodeChange = (event: React.ChangeEvent<HTMLSelectElement>, fieldName: string) => {
    const _newValue: string | number = event.target.value
    const _newValues = { ...newValues, [fieldName]: event.target.value }
    if (_newValue === LEAVE_EXISTING_VALUES) {
      delete _newValues[fieldName]
    } else if (_newValue === SET_TO_NULL) {
      _newValues[fieldName] = null
    }
    setNewValues(_newValues)
  }

  const dsCreated = (ds: FeatureLayerDataSource) => {
    setDataSource(ds)
    const lyr: FeatureLayer = ds.layer
    setEditableFeatureLayer(lyr)

    const fields: FieldArray = Array.from(props.config.calculateFields).map((f) => {
      const field: Esri.Field = lyr.fieldsIndex.get(f)
      return {
        name: field.name,
        alias: field.alias,
        domain: field.domain as CodedValueDomain
      }
    })
    setFieldsToUpdate(fields)
    setWidgetIsBusy(false)
  }

  const dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    if (ds && ds.getStatus() === DataSourceStatus.Loaded) {
      //const selectedRecords = ds.getSelectedRecordIds()
      //setSelectionCount(selectedRecords.length)
      return null
    }
  }

  const handleSelectionChange = (selection: ImmutableArray<string>): void => {
    //console.log(`Handle selection change: ${selection ? selection.toString() : 'no selection object'}`)
    if (selection) {
      setSelectionCount(selection.length)
      setSelectedFeatureIds(selection)
    }
  }

  function validateApplyEditsResult(result: Esri.EditsResult): ValidationResult {
    // Extract arrays for different edit results
    const resultArrays = [
      result.addFeatureResults,
      result.updateFeatureResults,
      result.deleteFeatureResults,
      result.addAttachmentResults,
      result.deleteAttachmentResults,
      result.updateAttachmentResults
    ].filter(Boolean)

    let totalResults = 0
    let errorCount = 0
    let successful = 0

    resultArrays.forEach(resultArray => {
      totalResults += resultArray.length
      resultArray.forEach(editResult => {
        if (editResult.error) {
          errorCount++
        } else {
          successful++
        }
      })
    })

    return {
      total: totalResults,
      errorCount: errorCount,
      successful: successful
    }
  }

  const handleBulkUpdateClick = async (evt: any) => {
    const featuresToUpdate: any[] = []

    selectedFeatureIds.forEach((id: string | number) => {
      if (typeof id === 'string') {
        id = parseInt(id)
      }
      const feature = { attributes: { ...newValues, [editableFeatureLayer.objectIdField]: id } }
      featuresToUpdate.push(feature)
    })
    setWidgetIsBusy(true)
    setAlertState({ type: null, message: '' })
    const result: Esri.EditsResult = await editableFeatureLayer.applyEdits({ updateFeatures: featuresToUpdate })
    const validation: ValidationResult = validateApplyEditsResult(result)

    // Refresh the data source if edits were applied successfully
    if (validation.successful > 0) {
      //can't figure out a way to get an associated List widget to refresh it's data,
      //so for now best to just clear the selection and force the user to reselect records.
      dataSource.selectRecordsByIds([])
      setNewValues({})
    }
    setWidgetIsBusy(false)

    // Set the alert based on validation result
    if (validation.errorCount === 0) {
      setAlertState({ type: 'success', message: props.intl.formatMessage({ id: 'alertSuccess', defaultMessage: defaultMessages.alertSuccess }) })
    } else if (validation.errorCount === validation.total) {
      setAlertState({ type: 'error', message: props.intl.formatMessage({ id: 'alertError', defaultMessage: defaultMessages.alertError }) })
      console.error(result)
    } else {
      setAlertState({ type: 'warning', message: props.intl.formatMessage({ id: 'alertWarning', defaultMessage: defaultMessages.alertWarning }) })
      console.warn(result)
    }
  }

  if (!isDsConfigured()) {
    return <h3>
      Bulk Update Widget
      <br />
      Please configure the data source.
    </h3>
  }

  return <div className='p-3' >
    <h2>{props.config.widgetTitle > ''
      ? props.config.widgetTitle
      : <FormattedMessage id="widgetTitle" defaultMessage={defaultMessages.widgetTitle} />
    }
    </h2>
    <h5><FormattedMessage id="numSelectedRecords" defaultMessage={defaultMessages.numSelectedRecords} /> {selectionCount}</h5>

    <DataSourceComponent
      useDataSource={props.useDataSources[0]} query={{ where: '1=1' } as FeatureLayerQueryParams}
      widgetId={props.id}
      onDataSourceCreated={dsCreated}
      onSelectionChange={handleSelectionChange}
    >
      {dataRender}
    </DataSourceComponent>

    {fieldsToUpdate && fieldsToUpdate.length > 0 && (
      fieldsToUpdate.map((f) => (
        <>
          <Label className='pt-3 pb-0' size='lg'>
            {f.alias ? f.alias : f.name}
          </Label>
          <Select
            className='pt-0'
            key={f.name}
            value={newValues[f.name]}
            onChange={(event) => { handleSelectedCodeChange(event, f.name) }}
            placeholder={
              `${props.intl.formatMessage({ id: 'selectionPlaceHolder', defaultMessage: defaultMessages.selectionPlaceHolder })}`
            }
          >
            {
              f.domain && f.domain.type === 'coded-value' &&
              [
                { code: LEAVE_EXISTING_VALUES, name: 'Leave existing values' },
                { code: SET_TO_NULL, name: 'Set to null' },
                ...Array.from(f.domain.codedValues)
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
              ].map((u) => (
                <Option key={String(u.code)} value={u.code}>
                  {u.name}
                </Option>
              ))
            }
          </Select>
        </>
      ))
    )}

    <div className='d-flex w-100 mb-2 pt-3 justify-content-between align-items-center'>
      <Button
        type='primary'
        size='default'
        onClick={handleBulkUpdateClick}
        disabled={!(Object.keys(newValues).length > 0 && selectionCount > 0 && !widgetIsBusy)}
      >
        {
          props.config.buttonText > ''
            ? props.config.buttonText
            : <FormattedMessage id="buttonText" defaultMessage={defaultMessages.buttonText} />
        } ({selectionCount})
      </Button>

      <div className='d-flex align-items-center'>
        {/* {widgetIsBusy && (
          <div style={{ position: 'relative', marginRight: '0.5rem' }}>
            <Loading type='DONUT' />
          </div>
        )} */}
        {!widgetIsBusy && alertState.type && (
          <Alert
            style={{
              width: 'fit-content',
              maxWidth: '100%',
              ...(fadeOut
                ? { opacity: 0, transition: 'opacity 0.5s ease-out' }
                : {})
            }}
            type={alertState.type}
            withIcon={true}
            closable={true}
            onClose={() => { setAlertState({ type: null, message: '' }) }}
          >
            {alertState.message}
          </Alert>
        )}
      </div>
    </div>
    {/* Loading overlay */}
    {widgetIsBusy && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(211, 211, 211, 0.5)', // light grey with 50% transparency
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10 // Ensure it overlays other content
        }}
      >
        <Loading type='SECONDARY' />
      </div>
    )}
  </div>
}
export default Widget
