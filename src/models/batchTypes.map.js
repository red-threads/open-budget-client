import Debug from 'debug'
import { set } from 'timm'
import batchTypes from './batchTypes.json'
import { findOneOrAll } from '../api'

const debug = Debug('ob:c:models:batchTypes:map')
const mappers = {
  csv: {
    transaction: async function ({ entity, item }) {
      const gross = Number(item['Amount (EUR)']) * 100
      debug(entity, item)
      debug('gross', gross)
      const isIncoming = gross > 0
      const payee = await findOneOrAll({
        entity: 'card',
        options: {
          filter: `(:or,(iban,:eq,\`${item['Account number']}\`),(name,:eq,\`${item.Payee}\`))`
        }
      })
      return Object.assign({
        createdAt: item.Date,
        gross,
        "Payee": "",
        "Account number": "",
        "Transaction type": "",
        "Payment reference": "",
        "Category": "",
        "Amount (EUR)": "",
        "Amount (Foreign Currency)": "",
        "Type Foreign Currency": "",
        "Exchange Rate": ""
      }, {
        [isComing ? 'from' : 'to']: payee
      })
    }
  }
}

const batchTypesWithMap = Object.entries(batchTypes).reduce((withMaps, [type, configuration]) => {
  return set(
    withMaps,
    type,
    set(
      configuration,
      'mapTo',
      configuration.mapTo.reduce((mapToWithTransformers, entity) => {
        debug(type, entity, mappers[type])
        const transformFns = mappers[type] || {}
        return set(mapToWithTransformers, entity, transformFns[entity] || (item => item))
      }, {})
    )
  )
}, {})

export default batchTypesWithMap
