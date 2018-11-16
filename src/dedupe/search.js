import { findOneOrAll } from '../api'

export default function search (data, filter) {
  const { configuration } = data
  if (!configuration.searchOnServer) {
    return data
  }
  return findOneOrAll({
    entity: configuration.name,
    options: {
      filter
    }
  }).then(({ data: serverItem }) => Object.assign({}, data, {
    serverItem
  }))
}
