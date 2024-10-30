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
import defaultMessages from './translations'
import {
  type FieldArray,
  type NewValues,
  LEAVE_EXISTING_VALUES,
  SET_TO_NULL,
  type AlertState
} from './types'
import { utils } from './utils'

const { useState, useEffect } = React

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [dataSource, setDataSource] = useState<DataSource | undefined>(undefined)
  const [newValues, setNewValues] = useState<NewValues>({})
  const [fieldsToUpdate, setFieldsToUpdate] = useState<FieldArray>([])
  const [selectionCount, setSelectionCount] = useState<number>(0)
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<ImmutableArray<string> | string[]>()
  const [editableFeatureLayer, setEditableFeatureLayer] = useState<FeatureLayer>()
  const [widgetIsBusy, setWidgetIsBusy] = useState<boolean>(true)
  const [alertState, setAlertState] = useState<AlertState>({ type: null, message: '' })
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
    if (selectedFeatureIds) {
      setSelectionCount(selectedFeatureIds.length)
    }
  }, [selectedFeatureIds])

  const dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
    if (ds && ds.getStatus() === DataSourceStatus.Loaded) {
      //const selectedRecords = ds.getSelectedRecordIds()
      //setSelectionCount(selectedRecords.length)
      return null
    }
  }

  if (!utils.isDsConfigured(props)) {
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
      onDataSourceCreated={(ds) => {
        utils.dsCreated(
          props,
          ds as FeatureLayerDataSource,
          setDataSource,
          setEditableFeatureLayer,
          setFieldsToUpdate,
          setWidgetIsBusy
        )
      } }
      onSelectionChange={(selection) => { utils.handleSelectionChange(selection, setSelectedFeatureIds) } }
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
            onChange={(event) => { utils.handleSelectedCodeChange(event, f.name, newValues, setNewValues) }}
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
        onClick={(evt) => {
          utils.handleBulkUpdateClick(
            props,
            newValues,
            selectedFeatureIds,
            editableFeatureLayer,
            setWidgetIsBusy,
            setAlertState,
            dataSource,
            setNewValues
          )
        }}
        disabled={!(Object.keys(newValues).length > 0 && selectionCount > 0 && !widgetIsBusy)}
      >
        {
          props.config.buttonText > ''
            ? props.config.buttonText
            : <FormattedMessage id="buttonText" defaultMessage={defaultMessages.buttonText} />
        } ({selectionCount})
      </Button>

      <div className='d-flex align-items-center'>
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
