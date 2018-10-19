import Debug from 'debug'
import Link from 'next/link'
import * as React from 'react'
import { addLast } from 'timm'
import batchTypes from '../../models/batchTypes.map'

const debug = Debug('ob:c:comp:updload-batch-list')
export default class UploadBatchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  async componentDidMount() {
    const { type, entity, items } = this.props
    if (!type || !entity || !items) {
      debug('CDM: missing type, entity, items', type, entity, items)
      return
    }
    debug('cdm')
    const mapper = batchTypes[type].mapTo[entity]
    debug('mapper', mapper)
    for (let item of items) {
      const itemsToAdd = await mapper(item)
      this.setState({
        items: addLast(this.state.items, itemsToAdd)
      })
    }
  }
  render() {
    const { items } = this.state
    debug('render items', items)
    if (items.length === 0) {
      return null
    }
    return (
      <table className='my-4 table table-striped'>
        <thead className='table-active'>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">API status</th>
            <th scope="col">Name</th>
            <th scope="col">Depends on</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => (
              <tr id={item.localUuid}>
                <td>{item.entityName}</td>
                <td>{item.isRemote ? 'On API' : 'Needs save'}{item.didUpdateRemote ? ', updated' : ''}</td>
                <td>
                  <Link href={{
                    pathname: item.isRemote ? `/${item.entityName}/${item.id}` : `/${item.entityName}/new`,
                    query: !item.isRemote ? item : {}
                  }}>
                    <a><pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(item.resource, '\t', 2)}</pre></a>
                  </Link>
                </td>
                <td>{item.dependsOn.map((dependency = {}) => (
                  <Link href={`#${dependency.id}`}>
                    <a>{dependecy.name}</a>
                  </Link>
                ))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
