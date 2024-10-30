import { type ImmutableObject } from 'seamless-immutable'

interface ConfigFields {
  name: string
  allowNulls: boolean
}
export type ArrayConfigFields = ConfigFields[]

export interface Config {
  fields: ArrayConfigFields
  widgetTitle: string
  buttonText: string
}

export type IMConfig = ImmutableObject<Config>
