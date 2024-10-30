import {
  type ValidationResult,
  LEAVE_EXISTING_VALUES,
  SET_TO_NULL,
  type NewValues
} from './types'
import Esri = __esri

export const isDsConfigured = (props) => {
  if (props.useDataSources &&
        props.useDataSources.length === 1 &&
        props.useDataSources[0].fields &&
        props.useDataSources[0].fields.length > 0
  ) {
    return true
  }
  return false
}

export const validateApplyEditsResult = (result: Esri.EditsResult): ValidationResult => {
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

export const handleSelectedCodeChange = (event: React.ChangeEvent<HTMLSelectElement>, fieldName: string, newValues: NewValues, setNewValues: React.Dispatch<React.SetStateAction<NewValues>>) => {
  const _newValue: string | number = event.target.value
  const _newValues = { ...newValues, [fieldName]: event.target.value }
  if (_newValue === LEAVE_EXISTING_VALUES) {
    delete _newValues[fieldName]
  } else if (_newValue === SET_TO_NULL) {
    _newValues[fieldName] = null
  }
  setNewValues(_newValues)
}
