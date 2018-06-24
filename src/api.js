import JsonApi from 'devour-client'

import Rollbar from './rollbar'

const rollbar = Rollbar()

const jsonApi = new JsonApi({
  apiUrl: 'https://open-budget-api.now.sh'
})
jsonApi.replaceMiddleware('errors', {
  name: 'custom-error',
  error: ({ request, response }) => {
    rollbar.error(`Devour client error`, {
      status: response.status,
      data: response.data,
      config: response.config,
      responseHeaders: response.headers,
      requestHeaders: request.headers,
      path: request.path,
      method: request.method
    })
    return {
      errors: response && response.data ? response.data.errors : null
    }
  }
})

export function findOneOrAll({ entity, id, options }) {
  if (id) {
    return jsonApi.find(entity, id, options)
  }
  return jsonApi.findAll(entity, options)
}

export default jsonApi
