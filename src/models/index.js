import { schema as cardSchema } from '@red-threads/open-budget-api/src/card/schema'
import { schema as organizationSchema } from '@red-threads/open-budget-api/src/organization/schema'
import { schema as transactionSchema } from '@red-threads/open-budget-api/src/transaction/schema'
import { schema as transactionTypeSchema } from '@red-threads/open-budget-api/src/transaction-type/schema'

import {
  entity as cardEntity,
  setModel as cardSetModel,
  fields as cardFields,
  fieldsList as cardFieldsList
} from './card'
import {
  entity as organizationEntity,
  setModel as organizationSetModel,
  fields as organizationFields,
  fieldsList as organizationFieldsList
} from './organization'
import {
  entity as transactionEntity,
  setModel as transactionSetModel,
  fields as transactionFields,
  fieldsList as transactionFieldsList
} from './transaction'
import {
  entity as transactionTypeEntity,
  setModel as transactionTypeSetModel,
  fields as transactionTypeFields,
  fieldsList as transactionTypeFieldsList
} from './transaction-type'

export const schemas = {
  card: cardSchema,
  organization: organizationSchema,
  transaction: transactionSchema,
  transactionType: transactionTypeSchema
}

export const schemaDescriptions = {
  card: cardSchema.describe(),
  organization: organizationSchema.describe(),
  transaction: transactionSchema.describe(),
  transactionType: transactionTypeSchema.describe()
}

export const fieldsLists = {
  card: cardFieldsList,
  organization: organizationFieldsList,
  transaction: transactionFieldsList,
  transactionType: transactionTypeFieldsList
}

export const entities = {
  card: cardEntity,
  organization: organizationEntity,
  transaction: transactionEntity,
  transactionType: transactionTypeEntity
}

export const setModels = {
  card: cardSetModel,
  organization: organizationSetModel,
  transaction: transactionSetModel,
  transactionType: transactionTypeSetModel
}

export const defaultIncludes = {
  card: [],
  organization: [cardEntity],
  transaction: [],
  transactionType: []
}

export const defaultValues = {
  card: cardFields,
  organization: organizationFields,
  transaction: transactionFields,
  transactionType: transactionTypeFields
}
