import { schema } from '@red-threads/open-budget-api/src/organization/schema'

import jsonApi from '../api'
import { setModel as setCardModel } from './card'
import { default as convertSchema } from '../converters/to-devour-model'

export const { name, fields } = convertSchema(schema)
export const entity = name

export const fieldsList = [
  'alias',
  'parent',
  'card'
]

export function setModel () {
  setCardModel()

  jsonApi.define(name, fields)
}
