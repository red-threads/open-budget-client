import shortid from 'shortid'
import dedupeConfiguration from './configuration.json'
import * as csvCardDeduper from './csv/card'
import * as csvOrganizationDeduper from './csv/organization'
import * as csvTransactionDeduper from './csv/transaction'
import * as csvTransactionTypeDeduper from './csv/transactionType'
import dedupe from './dedupe'

export const dedupers = {
  csv: {
    card: csvCardDeduper,
    organization: csvOrganizationDeduper,
    transaction: csvTransactionDeduper,
    transactionType: csvTransactionTypeDeduper
  }
}

function getConfiguration (type, entity) {
  return dedupeConfiguration[type].entities[entity]
}

function resolveDependencies ({ type, configuration, item, id }) {
  return (configuration.dependencies || [])
    .map(entityName =>
      dedupe(dedupers[type][entityName], {
        configuration: getConfiguration(type, entityName),
        id,
        item
      }))
}

export default async function deduper ({ type, entity, items }) {
  const typeConfiguration = dedupeConfiguration[type]
  const typeDedupers = dedupers[type]
  if (!typeConfiguration || !typeDedupers) {
    throw new Error(`Dedupe configuration or transform functions for type ${type} are missing`)
  }

  const configuration = getConfiguration(type, entity)
  const mainDeduper = typeDedupers[entity]
  if (!configuration || !mainDeduper) {
    throw new Error(`Dedupe configuration or function for entity ${entity} is missing`)
  }

  const resolvedItems = []

  for (const item of items) {
    const id = shortid()
    const dependencies = await Promise.all(
      resolveDependencies({ configuration, id, item, type })
    )
    const mainEntity = await dedupe(mainDeduper, { configuration, dependencies, id, item })
    resolvedItems.push(...dependencies, mainEntity)
  }

  return resolvedItems
}
