import {
  React,
  Immutable,
  type IMFieldSchema,
  type UseDataSource,
  AllDataSourceTypes,
  type FeatureLayerDataSource
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput, Label } from 'jimu-ui'
import { DataSourceSelector, FieldSelector } from 'jimu-ui/advanced/data-source-selector'
import {
  SettingSection
} from 'jimu-ui/advanced/setting-components'
import { DataSourceManager } from 'jimu-core'
import { type IMConfig } from '../config'

const { useState, useEffect } = React

export default function Setting(props: AllWidgetSettingProps<IMConfig>) {
  const [hiddenFields, setHiddenFields] = useState(Immutable([]))

  useEffect(() => {
    if (props.useDataSources && props.useDataSources.length > 0) {
      const ds: FeatureLayerDataSource = DataSourceManager.getInstance().getDataSource(props.useDataSources[0].dataSourceId) as FeatureLayerDataSource
      if (ds) {
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
    }
  }, [props.useDataSources])

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  }

  const labelChangeHandler = (configName: string, val: string) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set(configName, val)
    })
  }

  // When a field is chosen from the dropdown, save it to the settings.
  const fieldsListChangeHandler = (allSelectedFields: IMFieldSchema[]) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('calculateFields', allSelectedFields.map(f => f.jimuName)),
      useDataSources: [{ ...props.useDataSources[0], ...{ fields: allSelectedFields.map(f => f.jimuName) } }]
    })
  }

  return <div className='widget-setting-listen-selection-change p-2'>
    <SettingSection title='Configure data settings'>
      <Label>Set the feature layer source. This must be an editable feature layer.</Label>
      <DataSourceSelector
        types={Immutable([AllDataSourceTypes.FeatureLayer])}
        useDataSources={props.useDataSources}
        mustUseDataSource={true}
        onChange={onDataSourceChange}
        widgetId={props.id}
      />
      {props.useDataSources && props.useDataSources.length > 0 &&
        <>
          <Label className='pt-5' >
            Select the field that the updates will be applied to. Valid fields must be editable and have a coded value domain.
          </Label>
          <FieldSelector
            useDataSources={props.useDataSources}
            onChange={fieldsListChangeHandler}
            selectedFields={props.config.calculateFields || Immutable([])}
            isMultiple={true}
            isSearchInputHidden={false}
            isDataSourceDropDownHidden
            useDropdown={true}
            hiddenFields={hiddenFields}
          />
        </>
      }
    </SettingSection>

    <SettingSection title='Configure display settings'>
      <Label size='lg'>Widget title</Label>
      <Label size='sm'>Displays at the top of the widget</Label>
      <TextInput className='pb-2' type='text' defaultValue={props.config.widgetTitle} onAcceptValue={(val) => { labelChangeHandler('widgetTitle', val) }} />
      <Label size='lg'>Button label</Label>
      <Label size='sm'>For the button that applies the updates</Label>
      <TextInput className='pb-2' type='text' defaultValue={props.config.buttonText} onAcceptValue={(val) => { labelChangeHandler('buttonText', val) }} />
    </SettingSection>
  </div>
}
