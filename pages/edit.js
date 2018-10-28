import Debug from 'debug'
import camelCase from 'lodash.camelcase'
import Link from 'next/link'
import React from 'react'
import Form from 'react-jsonschema-form'
import Alert from 'react-s-alert'
import { mergeDeep } from 'timm'

import jsonApi from '../src/api'
import { CREATE, UPDATE } from '../src/auth/roles'
import ExtRefSelect from '../src/components/external-references/Select'
import Layout from '../src/components/layout/Layout'
import toForm from '../src/converters/to-form'
import { schemas, setModels, defaultIncludes, defaultValues } from '../src/models'
import withAuth from '../src/auth/withAuth'

const debug = Debug('ob:c:pages:edit')
const widgets = {
  ref: ExtRefSelect
}

export class Edit extends React.Component {
  static async getInitialProps (ctx) {
    const { query: { entity, id } } = ctx
    debug('gip', id)
    debug('entity', entity)
    const camelCaseEntity = camelCase(entity)
    setModels[camelCaseEntity]()
    const schema = await toForm(schemas[camelCaseEntity])
    const include = defaultIncludes[camelCaseEntity].join(',')
    const apiOptions = Object.assign({},
      include ? { include } : {}
    )
    debug('schema starts')
    debug(schema)
    debug('schema ends')
    return {
      action: id ? UPDATE : CREATE,
      apiOptions,
      camelCaseEntity,
      entity,
      id,
      initialData: id
        ? await jsonApi(ctx).find(camelCaseEntity, id, apiOptions)
        : {
          data: defaultValues[camelCaseEntity]
        },
      schema
    }
  }

  componentDidMount () {
    setModels[this.props.camelCaseEntity]()
  }

  validate (formData, errors) {
    const nextProps = mergeDeep(this.props, {
      initialData: {
        data: formData
      }
    })
    if (!this.onDemandRoleCheck(nextProps)) {
      Alert.error('Not enough permissions to do this')
      errors.id.addError('Role check failed. Insufficient permissions')
      return errors
    }
    const schema = schemas[this.props.camelCaseEntity]
    try {
      schema.validateSync(formData, {
        abortEarly: false
      })
    } catch ({ inner: validationErrors }) {
      Alert.error(`Validation errored! ${validationErrors.length} errors found`)
      validationErrors.forEach(error => {
        const basePath = error.path.split('.')[0]
        errors[basePath].addError(error.message)
      })
    }
    return errors
  }

  transformErrors (errors) {
    // yep is more than enough to validate the form
    return {}
  }

  async onSubmit ({ formData }) {
    const { apiOptions, entity, action } = this.props
    if (action === CREATE) {
      delete formData.id
    }
    const response = await jsonApi[action === UPDATE ? 'update' : 'create'](entity, formData, apiOptions)
    if (response.errors) {
      Alert.error(`Entity ${action} failed! ${JSON.stringify(response.errors)}`)
    } else {
      Alert.success(
        <div>
          Entity {action} succeeded! Link:
          <Link href={`/${entity}/${response.data.id}`}>
            <a>{response.data.id}</a>
          </Link>
        </div>
      )
    }
  }

  render () {
    const { action, entity, initialData: { data }, schema } = this.props
    debug('data')
    debug(data)
    debug('schema')
    debug(schema.schema)
    return (
      <Layout title={`${action} ${entity}`}>
        <h1 className='display-4'>{action === CREATE ? 'Create new' : 'Update'} <em>{data.name || data.organization}</em> {entity}</h1>
        <Form {...schema}
          formData={data}
          onSubmit={(...args) => this.onSubmit(...args)}
          widgets={widgets}
          validate={(...args) => this.validate(...args)}
          transformErrors={(...args) => this.transformErrors(...args)}
          className='pt-3'
        />
      </Layout>
    )
  }
}

export default withAuth(Edit)
