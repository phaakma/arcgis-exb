import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  calculateField: string
}

export type IMConfig = ImmutableObject<Config>
