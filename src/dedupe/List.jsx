import Debug from 'debug'
import Link from 'next/link'
import * as React from 'react'
import deduper from '.'

const debug = Debug('ob:c:comp:updload-batch-list')
export default class DedupedList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  async componentDidMount () {
    // const { type, entity, items } = this.props
    this.setState({
      items: await deduper(this.props)
    })
  }
  render () {
    const { items } = this.state
    debug('render items', items)
    if (items.length === 0) {
      return null
    }
    return (
      <table className='my-4 table table-striped'>
        <thead className='table-active'>
          <tr>
            <th scope='col'>Type</th>
            <th scope='col'>API status</th>
            <th scope='col'>Resource</th>
            <th scope='col'>Depends on</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(({ meta, payload }) => (
              <tr id={meta.id}>
                <td>{meta.entityName}</td>
                <td>{payload.serverItem ? 'On API' : 'Needs save'}</td>
                <td>
                  <Link href={{
                    pathname: payload.serverItem ? `/${meta.entityName}/${payload.mergedid}` : `/${meta.entityName}/new`,
                    query: payload.mergedItem
                  }}>
                    <a>
                      <pre style={{ whiteSpace: 'pre-wrap' }}>{
                        JSON.stringify(payload.mergedItem, '\t', 2)
                      }</pre>
                    </a>
                  </Link>
                </td>
                <td>{(payload.dependencies || []).map((dependency = {}) => (
                  <Link href={`#${dependency.meta.id}`}>
                    <a>{dependency.payload.mergedItem.name} (<em>{dependency.meta.entityName}</em>)</a>
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
