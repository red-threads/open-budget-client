import Debug from 'debug'
import { merge, set, addLast } from 'timm'
import batchTypes from './batchTypes.json'
import { findOneOrAll, update } from '../api'

const debug = Debug('ob:c:models:batchTypes:map')
function getLocalUuid() {
  const id = btoa(Math.floor(Math.random()*1000))
  return `${new Date().getTime()}-${id}`
}
const mappers = {
  csv: {
    card: async function (item) {
      const entityName = 'card'
      debug(entityName)
      debug(item)
      const iban = item['Account number']
      const name = item.Payee
      const reference = item['Payment reference']
      debug(iban, name, reference)
      let isRemote = false
      let didUpdateRemote = false
      let hasMultipleChoices = false
      let resource
      // Retrieve remote, if any
      let { data: resources } = await findOneOrAll({
        entity: entityName,
        options: {
          filter: `(:or,(iban,\`${iban}\`),(name,\`${name}\`),(aliases,\`${reference}\`))`
        }
      })
      debug('remote call to card', resources)
      if (resources.length === 1) {
        isRemote = true
        resource = resources[0]
        debug('found a remote card', name)
        if (resource.iban !== iban || resource.name !== name || !resource.aliases.includes(reference)) {
          resource = merge(resource, {
            iban,
            name,
            aliases: addLast(resource.aliases, reference)
          })
          await update({ entityName, resource })
          debug('remote card updated', resource)
          didUpdateRemote = true
        }
      } else if (resources.length > 1) {
        debug('MULTIPLE CHOICES FOUND!')
        isRemote = true
        hasMultipleChoices = true
      } else {
        debug('card not found remotely, returning its skeleton so it can be created')
        resource = {
          name,
          iban,
          aliases: [
            reference
          ]
        }
      }
      return [
        {
          dependsOn: [],
          didUpdateRemote,
          entityName,
          hasMultipleChoices,
          isRemote,
          localUuid: getLocalUuid(),
          resource,
          resources
        }
      ]
    },
    transaction: async function (item) {
      const entityName = 'transaction'
      debug(entityName)
      debug(item)
      const gross = Number(item['Amount (EUR)']) * 100
      const isIncoming = gross > 0
      debug('gross', gross, isIncoming)
      // Retrieve relationships
      const [ card ] = await mappers.csv.card(item)
      // Create skeleton
      const resource = Object.assign({
        createdAt: item.Date,
        gross: Math.abs(gross),
        'Account number': '',
        'Transaction type': '',
        'Payment reference': '',
        'Category': '',
        'Amount (EUR)': '',
        'Amount (Foreign Currency)': '',
        'Type Foreign Currency': '',
        'Exchange Rate': ''
      }, {
        [isIncoming ? 'from' : 'to']: card.resource
      })
      return [
        card,
        {
          dependsOn: [{ id: card.localUuid, name: card.resource.name }],
          didUpdateRemote: false,
          entityName,
          hasMultipleChoices: false,
          isRemote: false,
          localUuid: getLocalUuid(),
          resource
        }
      ]
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
