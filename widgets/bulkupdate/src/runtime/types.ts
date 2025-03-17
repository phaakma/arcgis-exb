import type CodedValueDomain from '@arcgis/core/layers/support/CodedValueDomain.js'

export interface ValidationResult {
  total: number
  errorCount: number
  successful: number
}

export interface FieldEntry {
  name: string
  alias: string
  domain: CodedValueDomain
  allowNulls: boolean
}

export type FieldArray = FieldEntry[]

export interface NewValues {
  [key: string]: string | number | null
}
export const LEAVE_EXISTING_VALUES = '|__LEAVE EXISTING VALUES__|'
export const SET_TO_NULL = '|__SET TO NULL__|'

export interface AlertState {
  type: 'success' | 'warning' | 'error' | null
  message: string
}
