import shortid from 'shortid'
import merge from './merge'
import search from './search'

export default async function deduper (entityModule, originalPayload) {
  const parsedPayload = await entityModule.parse(originalPayload)
  const serverPayload = await search(parsedPayload, entityModule.getSearchFilter(parsedPayload))
  const payload = await merge(serverPayload)
  return {
    meta: {
      id: shortid(),
      entityName: originalPayload.configuration.name,
      itemId: originalPayload.id
    },
    payload
  }
}
