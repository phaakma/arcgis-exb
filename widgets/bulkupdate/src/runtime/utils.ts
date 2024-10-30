import {
  type ValidationResult,
  LEAVE_EXISTING_VALUES,
  SET_TO_NULL,
  type NewValues,
  type AlertState,
  type FieldArray
} from './types'
import {
  type ImmutableArray,
  type AllWidgetProps,
  type DataSource,
  type FeatureLayerDataSource
} from 'jimu-core'
import { type IMConfig } from '../config'
import Esri = __esri
import type FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import type CodedValueDomain from '@arcgis/core/layers/support/CodedValueDomain.js'
import defaultMessages from './translations'

const isDsConfigured = (props) => {
  if (props.useDataSources &&
        props.useDataSources.length === 1 &&
        props.useDataSources[0].fields &&
        props.useDataSources[0].fields.length > 0
  ) {
    return true
  }
  return false
}

const dsCreated = (
  props: AllWidgetProps<IMConfig>,
  ds: FeatureLayerDataSource,
  setDataSource: React.Dispatch<React.SetStateAction<DataSource>>,
  setEditableFeatureLayer: React.Dispatch<React.SetStateAction<FeatureLayer>>,
  setFieldsToUpdate: React.Dispatch<React.SetStateAction<FieldArray>>,
  setWidgetIsBusy: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

const validateApplyEditsResult = (result: Esri.EditsResult): ValidationResult => {
// Extract arrays for different edit results
  const resultArrays = [
    result.addFeatureResults,
    result.updateFeatureResults,
    result.deleteFeatureResults,
    result.addAttachmentResults,
    result.deleteAttachmentResults,
    result.updateAttachmentResults
  ].filter(Boolean)

  return resultArrays.reduce(
    (acc, resultArray) => {
      acc.total += resultArray.length
      resultArray.forEach(editResult => editResult.error ? acc.errorCount++ : acc.successful++)
      return acc
    },
    { total: 0, errorCount: 0, successful: 0 }
  )
}

const handleSelectedCodeChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  fieldName: string,
  newValues: NewValues,
  setNewValues: React.Dispatch<React.SetStateAction<NewValues>>
) => {
  const _newValue: string | number = event.target.value
  const _newValues = { ...newValues, [fieldName]: event.target.value }
  if (_newValue === LEAVE_EXISTING_VALUES) {
    delete _newValues[fieldName]
  } else if (_newValue === SET_TO_NULL) {
    _newValues[fieldName] = null
  }
  setNewValues(_newValues)
}

const handleSelectionChange = (
  selection: ImmutableArray<string>,
  setSelectedFeatureIds: React.Dispatch<React.SetStateAction<ImmutableArray<string> | string[]>>
): void => {
  //console.log(`Handle selection change: ${selection ? selection.toString() : 'no selection object'}`)
  if (selection) {
    setSelectedFeatureIds(selection)
  }
}

const handleBulkUpdateClick = async (
  props: AllWidgetProps<IMConfig>,
  newValues: NewValues,
  selectedFeatureIds: ImmutableArray<string> | string[],
  editableFeatureLayer: FeatureLayer,
  setWidgetIsBusy: React.Dispatch<React.SetStateAction<boolean>>,
  setAlertState: React.Dispatch<React.SetStateAction<AlertState>>,
  dataSource: DataSource,
  setNewValues: React.Dispatch<React.SetStateAction<NewValues>>
) => {
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

export const utils = {
  isDsConfigured,
  dsCreated,
  validateApplyEditsResult,
  handleSelectedCodeChange,
  handleSelectionChange,
  handleBulkUpdateClick
}
