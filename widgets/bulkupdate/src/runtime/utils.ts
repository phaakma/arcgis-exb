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
