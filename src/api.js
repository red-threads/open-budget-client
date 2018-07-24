import JsonApi from 'devour-client'

import Rollbar from './rollbar'

const rollbar = Rollbar()

const jsonApi = new JsonApi({
  apiUrl: 'https://open-budget-api.now.sh'
})
jsonApi.replaceMiddleware('errors', {
  name: 'custom-error',
  error: (payload) => {
    const { data, status, config, headers, method, url } = payload
    rollbar.error(`Devour client error`, {
      status,
      data,
      config,
      headers,
      url,
      method
    })
    return {
      errors: data && data.data ? data.data.errors : [ payload ]
    }
  }
})

export function findOneOrAll ({ entity, id, options }) {
  if (id) {
    return jsonApi.find(entity, id, options)
  }
  return jsonApi.findAll(entity, options)
}

export default jsonApi
