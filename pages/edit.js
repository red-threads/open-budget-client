import Debug from 'debug'
import React from 'react'
import Form from 'react-jsonschema-form'

import { default as jsonApi } from '../src/api'
import { default as ExtRefSelect } from '../src/components/external-references/Select'
import { default as Layout } from '../src/components/layout/Layout'
import { default as toForm } from '../src/converters/to-form'
import { schemas, setModels, defaultIncludes, defaultValues } from '../src/models'

const debug = Debug('ob:c:pages:edit')
const widgets = {
  ref: ExtRefSelect
}

export default class extends React.Component {
  static async getInitialProps ({ query: { id, entity } }) {
    debug('gip', id)
    debug('entity', entity)
    setModels[entity]()
    const schema = await toForm(schemas[entity])
    const include = defaultIncludes[entity].join(',')
    const apiOptions = Object.assign({},
      include ? { include } : {}
    )
    debug('schema starts')
    debug(schema)
    debug('schema ends')
    return {
      action: id ? 'edit' : 'create',
      apiOptions,
      entity,
      id,
      initialData: id
        ? await jsonApi.find(entity, id, apiOptions)
        : defaultValues,
      schema
    }
  }

  componentDidMount () {
    setModels[this.props.entity]()
  }

  validate (formData, errors) {
    const schema = schemas[this.props.entity]
    try {
      schema.validateSync(formData, {
        abortEarly: false
      })
    } catch ({ inner: validationErrors }) {
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
    const response = await jsonApi[action === 'edit' ? 'update' : 'create'](entity, formData, apiOptions)
    console.log(response)
  }

  render () {
    const { action, entity, initialData: { data }, schema } = this.props
    debug('data')
    debug(data)
    debug('schema')
    debug(schema.schema)
    return (
      <Layout title={`${action} ${entity}`}>
        <h1>{action === 'create' ? `Create new` : `Update ${data.name || data.organization} ${entity}`}</h1>
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
