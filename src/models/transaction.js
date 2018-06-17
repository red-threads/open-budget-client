import pluralize from 'pluralize'

import jsonApi from '../api'
import { setModel as setCardModel, entity as cardEntity } from './card'
import { setModel as setOrgModel, entity as orgEntity } from './org'
import { setModel as setTransactionTypeModel, entity as transactionTypeEntity } from './transaction-type'

export const entity = 'transaction'

export function setModel () {
  setCardModel()
  setOrgModel()
  setTransactionTypeModel()

  jsonApi.define(entity, {
    createdAt: null,
    updatedAt: null,
    type: {
      sonApi: 'hasOne',
      type: pluralize(transactionTypeEntity)
    },
    from: {
      jsonApi: 'hasOne',
      type: pluralize(cardEntity)
    },
    gateway: {
      jsonApi: 'hasOne',
      type: pluralize(orgEntity)
    },
    to: {
      jsonApi: 'hasOne',
      type: pluralize(cardEntity)
    },
    gross: 0,
    vat: 0,
    gatewayFee: 0,
    net: 0,
    status: '',
    source: '',
    originalTransaction: {
      jsonApi: 'hasOne',
      type: pluralize(entity)
    },
    invoice: '',
    externalReference: ''
  })
}
