import { merge, set } from 'timm'

function resolveRelationship ({ type, ref }, originalType) {
  const isArray = originalType === 'array'
  if (!type || type !== 'ObjectId') {
    return isArray ? [] : ''
  }
  return {
    type: ref,
    jsonApi: isArray ? 'hasMany' : 'hasOne'
  }
}

function getDefaultValue ({ meta, type, innerType }, originalType) {
  switch (type) {
    case 'string':
      return ''
    case 'number':
      return 0
    case 'array':
      return getDefaultValue(innerType, type)
    case 'object':
      return resolveRelationship(meta, originalType)
    default:
      return ''
  }
}

export default function toDevourModel (schema) {
  const schemaDescription = schema.describe()
  const fields = Object.entries(schemaDescription.fields)
    .reduce((fieldsToReturn, [ fieldName, fieldAttributes ]) => {
      return set(fieldsToReturn, fieldName, getDefaultValue(fieldAttributes))
    }, {})
  return {
    name: schemaDescription.meta.name,
    fields: merge(fields, {
      createdAt: 0,
      updatedAt: 0
    })
  }
}
