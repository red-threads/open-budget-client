import Debug from 'debug'
import camelCase from 'lodash.camelcase'
import StartCase from 'lodash.startcase'
import Link from 'next/link'
import pluralize from 'pluralize'
import React from 'react'
import { merge } from 'timm'

import { findOneOrAll } from '../src/api'
import { LIST, CREATE } from '../src/auth/roles'
import Layout from '../src/components/layout/Layout'
import { schemaDescriptions, setModels, defaultIncludes, fieldsLists } from '../src/models'
import withAuth from '../src/auth/withAuth'

const debug = Debug('ob:c:pages:list')

export class List extends React.Component {
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
      action: LIST,
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

  componentDidMount () {
    setModels[this.props.camelCaseEntity]()
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
        <h1 className='display-4'>List of {pluralize(StartCase(entity))}</h1>
        <p className='lead'>{schema.meta.description}</p>
        <table className='my-4 table table-striped'>
          <thead className='table-active'>
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
                    <Link href={`/${entity}/${item.id}`}>
                      <a>{item.id}</a>
                    </Link>
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
            <tr className='table-sm table-active text-right'>
              <td colSpan={fieldsList.length + 1}>
                {this.props.onDemandRoleCheck({ ...this.props, action: CREATE }) && (
                  <Link href={`${entity}/new`}>
                    <a className='btn btn-sm btn-dark mx-2'>Add new</a>
                  </Link>
                )}
                {this.props.onDemandRoleCheck({ ...this.props, action: 'batch_csv' }) && (
                  <Link href={`/upload-batch/${entity}/csv`}>
                    <a className='btn btn-sm btn-outline-dark mx-2'>Upload CSV batch</a>
                  </Link>
                )}
                {this.props.onDemandRoleCheck({ ...this.props, action: 'batch_cc' }) && (
                  <Link href={`/upload-batch/${entity}/cc`}>
                    <a className='btn btn-sm btn-outline-dark mx-2 disabled' aria-disabled='true'>Upload CC batch</a>
                  </Link>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </Layout>
    )
  }
}

export default withAuth(List)
