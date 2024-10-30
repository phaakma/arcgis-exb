import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  calculateField: string
  widgetTitle: string
  valuePlaceHolder: string
  buttonText: string
}

export type IMConfig = ImmutableObject<Config>
