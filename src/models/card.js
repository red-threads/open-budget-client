import { schema } from '@red-threads/open-budget-api/src/card/schema'

import jsonApi from '../api'
import { default as convertSchema } from '../converters/to-devour-model'

export const { name, fields } = convertSchema(schema)
export const entity = name

export const fieldsList = [
  'category',
  'name',
  'email',
  'organization',
  'locality'
]

export function setModel () {
  jsonApi.define(name, fields)
}
