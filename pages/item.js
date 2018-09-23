import Debug from 'debug'
import camelCase from 'lodash.camelcase'
import React from 'react'

import jsonApi from '../src/api'
import { READ } from '../src/auth/roles'
import Layout from '../src/components/layout/Layout'
import toForm from '../src/converters/to-form'
import { schemas, setModels, defaultIncludes, defaultValues } from '../src/models'
import withAuth from '../src/auth/withAuth'

const debug = Debug('ob:c:pages:item')

export class Item extends React.Component {
  static async getInitialProps ({ query: { id, entity } }) {
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
      action: READ,
      apiOptions,
      camelCaseEntity,
      entity,
      id,
      initialData: id
        ? await jsonApi.find(camelCaseEntity, id, apiOptions)
        : defaultValues,
      schema
    }
  }

  componentDidMount () {
    setModels[this.props.camelCaseEntity]()
  }

  render () {
    const { action, entity, initialData: { data }, schema: { schema: { properties } } } = this.props
    debug('data')
    debug(data)
    debug('props')
    debug(properties)
    return (
      <Layout title={`${action} ${entity}`}>
        <h1 className="display-4"><em>{data.name || data.organization}</em> {entity}</h1>
        <dl className="my-4">
          {Object.entries(data).map(([key, value]) => (
            <div>
              <dt>{properties[key] && properties[key].title ? properties[key].title : key}</dt>
              <dd><pre>{JSON.stringify(value, '\t', 2)}</pre></dd>
            </div>
          ))}
        </dl>
      </Layout>
    )
  }
}

export default withAuth(Item)
