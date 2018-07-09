import { schema } from '@red-threads/open-budget-api/src/transaction-type/schema'

import jsonApi from '../api'
import { default as convertSchema } from '../converters/to-devour-model'

export const { name, fields } = convertSchema(schema)
export const entity = name

export function setModel () {
  jsonApi.define(name, fields)
}
