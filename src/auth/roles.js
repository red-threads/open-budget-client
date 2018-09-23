import Debug from 'debug'
import batchTypes from '../models/batchTypes.json'

const debug = Debug('ob:c:auth:roles')

// Actions
export const LIST = 'list'
export const READ = 'read'
export const CREATE = 'create'
export const UPDATE = 'update'
export const BATCH = Object.values(batchTypes).map(type => `batch_${type.id}`)

// Specifiers
export const ANY = '*'

/*
 * availble_roles:
 * {
 *   list: [
 *     {
 *       entity: 'card',
 *       id: '*'
 *     }
 *   ],
 *   read: [
 *     {
 *       entity: '*',
 *       id: '123'
 *     },
 *     {
 *       entity: 'card',
 *       key: 'parent_id',
 *       value: '123'
 *     }
 *   ],
 *   create: [
 *     {
 *       entity: 'card',
 *       key: 'category',
 *       value: 'person'
 *     },
 *     {
 *       entity: 'transaction',
 *       key: 'from',
 *       value: '123'
 *     },
 *     {
 *       entity: 'transaction',
 *       key: 'to',
 *       value: '123'
 *     }
 *   ]
 * }
 **/

function roleHasPropertyOrWildcard (roleValue, valueToFind) {
  return roleValue === valueToFind || roleValue === ANY
}

export function check ({ action, camelCaseEntity, id, initialData, onDemand = false }, availableRoles) {
  if (!action) {
    console.error('Tried to check roles without an action set. Are you missing the "action" prop maybe?')
    return false
  }
  if (!camelCaseEntity) {
    console.error('Tried to check roles without an entity set. Are you missing the "camelCaseEntity" prop maybe?')
    return false
  }
  debug('check')
  debug('ac&en', action, camelCaseEntity)
  debug(id)
  // 1. check action
  const applicableRoles = availableRoles[action]
  debug('applicable roles', applicableRoles)
  if (!applicableRoles || applicableRoles.length === 0) {
    console.error(`No actions allowed for the action ${action}`)
    return false
  }
  // 2. is this a create action? Then it's fine; we'll check the permissions later on form submit
  debug('ondemand?', onDemand)
  if (action === CREATE && !onDemand) {
    return true
  }
  // 3. exclude if the entity is not allowed
  const rolesByEntity = applicableRoles.filter(role => roleHasPropertyOrWildcard(role.entity, camelCaseEntity))
  debug('byEnt', rolesByEntity)
  if (rolesByEntity.length === 0) {
    console.error(`No permission to perform action ${action} on entity ${camelCaseEntity}`)
    return false
  }
  // 4. check specific-id, any-id
  const roleById = rolesByEntity.find(role => roleHasPropertyOrWildcard(role.id, id))
  debug('byId', roleById)
  if (roleById) {
    return true
  }
  // 5. check data
  return rolesByEntity.find(role => initialData[role.key] && initialData[role.key] === role.value)
}
