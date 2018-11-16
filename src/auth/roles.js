import Debug from 'debug'
import batchTypes from '../dedupe/configuration.json'

const debug = Debug('ob:c:auth:roles')
debug('batch types', batchTypes)

// Actions
export const LIST = 'list'
export const READ = 'read'
export const CREATE = 'create'
export const UPDATE = 'update'
export const BATCH = Object.keys(batchTypes).map(type => `batch_${type}`)

export function check ({ action, entity }, availableRoles) {
  const scope = `${action}:${entity}`
  debug('check')
  debug(scope)
  debug(availableRoles)
  return availableRoles.includes(scope)
}
