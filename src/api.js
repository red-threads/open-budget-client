import Debug from 'debug'
import JsonApi from 'devour-client'
import qs from 'qs'
import { setIn } from 'timm'

import { getSession } from './auth'
import Rollbar from './rollbar'

const debug = Debug('ob:c:api')
const rollbar = Rollbar()
let jsonApi

export default function getClient(ctx) {
  if (!jsonApi) {
    jsonApi = new JsonApi({
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
    jsonApi.insertMiddlewareBefore('axios-request', {
      name: 'authorization-header',
      req: payload => payload
    })
  }
  jsonApi.replaceMiddleware('authorization-header', {
    name: 'authorization-header',
    req: payload => {
      const authHeader = getSession('authHeader', ctx)
      debug('authorization-header', Object.keys(payload.req.headers))
      return setIn(payload, ['req', 'headers', 'Authorization'], authHeader || 'none')
    }
  })

  return jsonApi
}

export function findOneOrAll ({ entity, id, options }, ctx) {
  const jsonApi = getClient(ctx)
  if (id) {
    return jsonApi.find(entity, id, options)
  }
  return jsonApi.findAll(entity, options)
}

export function update({ entityName, resource }, ctx) {
  return getClient(ctx).update(entityName, resource)
}
