import { findOneOrAll } from './api'

export const references = {}

export function fetchReferences(entity) {
  if (references[entity]) {
    return Promise.resolve(references[entity])
  }
  return findOneOrAll({
    entity
  }).then(({ data: items }) => {
    references[entity] = items
    return items
  })
}
