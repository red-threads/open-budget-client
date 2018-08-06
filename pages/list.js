import Debug from 'debug'
import camelCase from 'lodash.camelcase'
import StartCase from 'lodash.startcase'
import Link from 'next/link'
import pluralize from 'pluralize'
import React from 'react'
import { merge } from 'timm'

import { findOneOrAll } from '../src/api'
import Layout from '../src/components/layout/Layout'
import { schemaDescriptions, setModels, defaultIncludes, fieldsLists } from '../src/models'

const debug = Debug('ob:c:pages:list')

export default class extends React.Component {
  static async getInitialProps ({ query: { entity } }) {
    const camelCaseEntity = camelCase(entity)
    setModels[camelCaseEntity]()
    const schema = schemaDescriptions[camelCaseEntity]
    const fieldsList = fieldsLists[camelCaseEntity]
      .map(fieldName => merge(schema.fields[fieldName], { fieldName }))
    const include = defaultIncludes[camelCaseEntity].join(',')
    const options = Object.assign({},
      include ? { include } : {}
    )
    return {
      action: 'list',
      entity,
      camelCaseEntity,
      fieldsList,
      initialData: await findOneOrAll({
        entity,
        options
      }).then(({ data }) => data),
      schema
    }
  }

  render () {
    const { entity, errors, fieldsList, initialData, schema } = this.props
    debug(entity)
    debug(errors)
    debug(schema)
    if (errors) {
      return <div style={{ backgroundColor: 'red', color: 'white' }}>{JSON.stringify(errors, '\t', 2)}</div>
    }
    return (
      <Layout title='Organizations'>
        <h1>List of {pluralize(entity)}</h1>
        <p>{schema.meta.description}</p>
        <main>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                {
                  fieldsList.map(({ fieldName }) => (
                    <th scope='col' key={fieldName}>{StartCase(fieldName)}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                initialData.map(item => (
                  <tr key={item.id}>
                    <td>
                      <a href={item.links.self}>{item.id}</a>
                    </td>
                    {
                      fieldsList.map(({ fieldName, isIndex }) => (
                        <td scope={isIndex ? 'row' : ''} key={fieldName}>{
                          item[fieldName] && item[fieldName].id
                            ? (
                              <a href={item[fieldName].links.self}>{item[fieldName].id}</a>
                            )
                            : item[fieldName]
                        }</td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={fieldsList.length}>
                  <Link href={`${entity}/new`}>
                    <a>Add new</a>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </main>
      </Layout>
    )
  }
}
