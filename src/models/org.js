import pluralize from 'pluralize'

import jsonApi from '../api'
import { setModel as setCardModel, entity as cardEntity } from './card'

export const entity = 'organization'

export function setModel () {
  setCardModel()

  jsonApi.define(entity, {
    createdAt: null,
    updatedAt: null,
    name: '',
    alias: '',
    card: {
      jsonApi: 'hasOne',
      type: pluralize(cardEntity)
    },
    parent: {
      jsonApi: 'hasOne',
      type: pluralize(entity)
    },
    people: {
      jsonApi: 'hasMany',
      type: pluralize(cardEntity)
    },
    feeAsGateway: 0
  })
}
