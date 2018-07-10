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
    setModels[entity]()
    const schema = await toForm(schemas[entity])
    debug('schema starts')
    debug(schema)
    debug('schema ends')
    return {
      action: id ? 'edit' : 'create',
      entity,
      id,
      initialData: id ?
        await jsonApi.find(entity, id, {
          include: defaultIncludes[entity].join(',')
        }) :
        defaultValues,
      schema
    }
  }

  render () {
    const { action, entity, initialData: { data }, schema } = this.props
    debug('data')
    debug(data)
    debug('schema')
    debug(schema)
    return (
      <Layout title={`${action} ${entity}`}>
        <h1>{action === 'create' ? `Create new` : `Update #${entity}`}</h1>
        <Form {...schema}
          formData={data}
          onChange={() => console.log("changed")}
          onSubmit={() => console.log("submitted")}
          onError={() => console.log("errors")}
          widgets={widgets}
        />
      </Layout>
    )
  }
}
