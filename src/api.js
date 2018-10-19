import Debug from 'debug'
import JsonApi from 'devour-client'
import qs from 'qs'

import Rollbar from './rollbar'

const debug = Debug('ob:c:api')
const rollbar = Rollbar()

const jsonApi = new JsonApi({
  apiUrl: process.env.API_URL
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
jsonApi.insertMiddlewareBefore('axios-request', {
  name: 'unescape-filter',
  req: payload => {
    payload.req.paramsSerializer = params => qs.stringify(params, { encode: false })
    return payload
  }
})

export function findOneOrAll ({ entity, id, options }) {
  if (id) {
    return jsonApi.find(entity, id, options)
  }
  return jsonApi.findAll(entity, options)
}

export const update = jsonApi.update

export default jsonApi
