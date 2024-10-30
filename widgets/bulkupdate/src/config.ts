import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  calculateFields: string[]
  widgetTitle: string
  valuePlaceHolder: string
  buttonText: string
}

export type IMConfig = ImmutableObject<Config>
