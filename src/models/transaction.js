import { schema } from '@red-threads/open-budget-api/src/organization/schema'

import jsonApi from '../api'
import { setModel as setCardModel } from './card'
import convertSchema from '../converters/to-devour-model'
import { setModel as setOrgModel } from './organization'
import { setModel as setTransactionTypeModel } from './transaction-type'

export const { name, fields } = convertSchema(schema)
export const entity = name

export const fieldsList = [
  'type',
  'from',
  'to',
  'gross',
  'gatewayFee',
  'source'
]

export function setModel () {
  setCardModel()
  setOrgModel()
  setTransactionTypeModel()

  jsonApi().define(name, fields)
}
