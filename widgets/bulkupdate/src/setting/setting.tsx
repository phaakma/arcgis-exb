import {
  React,
  Immutable,
  type IMFieldSchema,
  type UseDataSource,
  AllDataSourceTypes,
  ImmutableArray,
  type FeatureLayerDataSource,
  type DataSource
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { DataSourceSelector, FieldSelector } from 'jimu-ui/advanced/data-source-selector'
import {
  SettingRow
} from 'jimu-ui/advanced/setting-components'
import { DataSourceManager } from 'jimu-core'
import { type IMConfig } from '../config'

const { useState, useEffect } = React

export default function Setting(props: AllWidgetSettingProps<IMConfig>) {
  const [hiddenFields, setHiddenFields] = useState(Immutable([]))

  useEffect(() => {
    if (props.useDataSourcesEnabled && props.useDataSources && props.useDataSources.length > 0) {
      const ds: FeatureLayerDataSource = DataSourceManager.getInstance().getDataSource(props.useDataSources[0].dataSourceId) as FeatureLayerDataSource
      const layerDef = ds.getLayerDefinition()
      const _hiddenFields = layerDef.fields
        .filter(item =>
          !item.editable ||
          !item.domain ||
          (item.domain && item.domain.type !== 'codedValue')
        )
        .map(item => item.name)

      setHiddenFields(Immutable(_hiddenFields))
    }
  }, [props.useDataSourcesEnabled, props.useDataSources])

  const onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    props.onSettingChange({
      id: props.id,
      useDataSourcesEnabled
    })
  }

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  }

  // When a field is chosen from the dropdown, save it to the settings.
  const fieldsListChangeHandler = (allSelectedFields: IMFieldSchema[]) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('calculateField', allSelectedFields[0].name),
      useDataSources: [{ ...props.useDataSources[0], ...{ fields: allSelectedFields.map(f => f.jimuName) } }]
    })
  }

  return <div className='widget-setting-listen-selection-change p-2'>
    <SettingRow
      flow='wrap'
      label='Set the feature layer source. This must be an editable layer.'
    >
      <DataSourceSelector
        types={Immutable([AllDataSourceTypes.FeatureLayer])}
        useDataSources={props.useDataSources}
        useDataSourcesEnabled={props.useDataSourcesEnabled}
        onToggleUseDataEnabled={onToggleUseDataEnabled}
        onChange={onDataSourceChange}
        widgetId={props.id}
      />
    </SettingRow>

    {props.useDataSourcesEnabled && props.useDataSources && props.useDataSources.length > 0 &&

      <SettingRow
        flow='wrap'
        label='Select the field that the updates will be applied to. Valid fields must be editable and have a coded value domain.'
      >
        <FieldSelector
          useDataSources={props.useDataSources}
          onChange={fieldsListChangeHandler}
          selectedFields={Immutable([props.config.calculateField])}
          isMultiple={false}
          isSearchInputHidden={false}
          isDataSourceDropDownHidden
          useDropdown={true}
          hiddenFields={hiddenFields}
        />
      </SettingRow>
    }
  </div>
}
