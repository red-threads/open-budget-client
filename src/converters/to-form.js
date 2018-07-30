import Debug from 'debug'
import camelCase from 'lodash.camelcase'
import { addLast, set } from 'timm'

import { fetchReferences } from '../components/external-references'
import { schemaDescriptions } from '../models'

const prefix = 'ob:c:conv:to-form'

function getRequired (schemaDescription) {
  return Object.entries(schemaDescription.fields)
    .reduce((requiredFields, [key, field]) =>
      field.tests.includes('required') ? addLast(requiredFields, key) : requiredFields, [])
}

function getDefault (type) {
  if (type === 'string') {
    return ''
  } else if (type === 'number') {
    return 0
  } else if (type === 'object') {
    return ''
  } else if (type === 'date') {
    return ''
  }
}

async function getNestedProperties (field) {
  const debug = Debug(`${prefix}:getNestedProperties`)
  if (field.type !== 'object' || field.meta.type !== 'ObjectId') {
    return {
      schema: {},
      uiSchema: {}
    }
  }
  const innerSchema = schemaDescriptions[camelCase(field.meta.ref)]
  if (!innerSchema) {
    return {
      schema: {},
      uiSchema: {}
    }
  }
  const items = await fetchReferences(innerSchema.meta.name)
  debug('items')
  debug(items)

  return {
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          default: ''
        }
      }
    },
    uiSchema: {
      id: {
        'ui:widget': 'ref',
        'ui:options': {
          innerSchema,
          items
        }
      }
    }
  }
}

async function getArray (field) {
  const debug = Debug(`${prefix}:getArray`)
  if (field.type !== 'array') {
    return {
      schema: {},
      uiSchema: {}
    }
  }
  debug(field.innerType)
  const { schema: innerSchema, uiSchema: innerUiSchema } = await getField(field.innerType)
  debug('inner result')
  debug(innerSchema)
  return {
    schema: {
      default: [],
      items: innerSchema
    },
    uiSchema: {
      items: innerUiSchema
    }
  }
}

function getEnum ({ meta: { oneOf } = {} }) {
  const debug = Debug(`${prefix}:getEnum`)
  debug(oneOf)
  if (oneOf) {
    return {
      enum: oneOf
    }
  }
  return {}
}

function getDateSchema(field) {
  if (field.type === 'date') {
    return {
      schema: {
        type: 'string',
        format: 'date'
      },
      uiSchema: {
        'ui:widget': 'alt-date'
      }
    }
  }
  return {}
}

async function getField (field) {
  const debug = Debug(`${prefix}:getField`)
  debug(field)
  const { schema: arraySchema, uiSchema: arrayUiSchema } = await getArray(field)
  debug('array')
  debug(arraySchema)
  debug('next: getNested!!!!!!!')
  const { schema: objectSchema = {}, uiSchema: objectUiSchema = {} } = await getNestedProperties(field)
  debug('nested')
  debug(objectUiSchema)
  const defaultValue = getDefault(field.type)
  const { schema: dateSchema, uiSchema: dateUiSchema } = getDateSchema(field)
  const schema = Object.assign(
    {
      type: field.type,
      title: field.label
    },
    defaultValue ? {
      default: defaultValue
    } : {},
    getEnum(field),
    arraySchema,
    objectSchema,
    dateSchema
  )
  const uiSchema = Object.assign({},
    arrayUiSchema,
    objectUiSchema,
    dateUiSchema
  )
  return {
    schema,
    uiSchema
  }
}

async function getFields (schemaDescription) {
  const debug = Debug(`${prefix}:getFields`)
  let schema = {
    id: {
      type: 'string',
      default: ''
    }
  }
  let uiSchema = {
    id: {
      'ui:widget': 'hidden'
    }
  }
  const fields = Object.entries(schemaDescription.fields)

  for (let [ key, field ] of fields) {
    const { schema: fieldSchema, uiSchema: fieldUiSchema } = await getField(field)
    schema = set(schema, key, fieldSchema)
    uiSchema = set(uiSchema, key, fieldUiSchema)
  }
  debug(uiSchema.card)
  return {
    schema,
    uiSchema
  }
}

export default async function toForm (inputSchema) {
  const debug = Debug(`${prefix}:toForm`)
  const schemaDescription = inputSchema.describe()
  debug(schemaDescription)
  const { schema: fieldsSchema, uiSchema } = await getFields(schemaDescription)
  debug('## ui schema ##')
  debug(uiSchema)
  debug('#######')
  const schema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://json-schema.org/draft-07/schema#',
    title: schemaDescription.meta.description,
    type: 'object',
    required: getRequired(schemaDescription),
    properties: fieldsSchema
  }
  debug('## JSON schema ##')
  debug(JSON.stringify(schema, '\t', 2))
  debug('#######')
  return {
    schema,
    uiSchema
  }
}
