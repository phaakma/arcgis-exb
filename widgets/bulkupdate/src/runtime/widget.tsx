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
import { Button, Select, Option, Alert, Loading } from 'jimu-ui'
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
  [key: string]: string | number | undefined
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [dataSource, setDataSource] = useState<DataSource | undefined>(undefined)
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined)
  const [newValues, setNewValues] = useState<NewValues>({})
  const [fieldsToUpdate, setFieldsToUpdate] = useState<FieldArray>([])
  const [selectionCount, setSelectionCount] = useState<number>(0)
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<ImmutableArray<string> | string[]>()
  const [editableFeatureLayer, setEditableFeatureLayer] = useState<FeatureLayer>()
  const [widgetIsBusy, setWidgetIsBusy] = useState<boolean>(false)
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

  useEffect(() => {
    if (selectedFeatureIds) console.log(selectedFeatureIds)
  }, [selectedFeatureIds])

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
    console.log(fieldName)
    setSelectedCode(event.target.value)
    setNewValues(prevValues => ({ ...prevValues, [fieldName]: event.target.value }))
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
  }

  const dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    if (ds && ds.getStatus() === DataSourceStatus.Loaded) {
      //const selectedRecords = ds.getSelectedRecordIds()
      //setSelectionCount(selectedRecords.length)
      return null
    }
  }

  const handleSelectionChange = (selection: ImmutableArray<string>): void => {
    console.log(`Handle selection change: ${selection ? selection.toString() : 'no selection object'}`)
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
      console.log(`id: ${id}`)
      const feature = { attributes: { ...newValues, [editableFeatureLayer.objectIdField]: parseInt(id) } }
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
      setSelectedCode(null)
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

  return <div className='p-3'>
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
        <Select
          className='pt-3'
          key={f.name}
          onChange={(event) => { handleSelectedCodeChange(event, f.name) }}
          placeholder={
            `${props.intl.formatMessage({ id: 'selectionPlaceHolder', defaultMessage: defaultMessages.selectionPlaceHolder })} ${f.alias ? f.alias : f.name}`
          }
        >
          {
            f.domain && f.domain.type === 'coded-value' &&
            Array.from(f.domain.codedValues)
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((u) => (
                <Option key={u.code} value={u.code}>
                  {u.name}
                </Option>
              ))
          }
        </Select>
      ))
    )}

    <div className='d-flex w-100 mb-2 pt-3 justify-content-between align-items-center'>
      <Button
        type='primary'
        size='default'
        onClick={handleBulkUpdateClick}
        disabled={!(selectedCode) || widgetIsBusy}
      >
        {
          props.config.buttonText > ''
            ? props.config.buttonText
            : <FormattedMessage id="buttonText" defaultMessage={defaultMessages.buttonText} />
        } ({selectionCount})
      </Button>

      <div className='d-flex align-items-center'>
        {widgetIsBusy && (
          <div style={{ position: 'relative', marginRight: '0.5rem' }}>
            <Loading type='DONUT' />
          </div>
        )}
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
  </div>
}
export default Widget
