import { schema } from '@red-threads/open-budget-api/src/transaction-type/schema'

import jsonApi from '../api'
import convertSchema from '../converters/to-devour-model'

export const { name, fields } = convertSchema(schema)
export const entity = name

export const fieldsList = [
  'type',
  'value',
  'fromCountry',
  'toCountry'
]

export function setModel () {
  jsonApi.define(name, fields)
}
