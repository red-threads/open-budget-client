import jsonApi from '../api'

export const entity = 'transaction-type'

export function setModel () {
  jsonApi.define(entity, {
    createdAt: null,
    updatedAt: null,
    type: '',
    value: '',
    note: '',
    fromCountry: '',
    toCountry: ''
  })
}
