import Debug from 'debug'
import React from 'react'
import CSVReader from 'react-csv-reader'
import Alert from 'react-s-alert'
import pluralize from 'pluralize'

import { BATCH } from '../src/auth/roles'
import DedupedList from '../src/dedupe/List'
import Layout from '../src/components/layout/Layout'

const debug = Debug('ob:c:pages:upload-batch')

export default class UploadBatch extends React.Component {
  static async getInitialProps ({ query: { entity, type } }) {
    debug(type)
    debug(entity)
    return {
      action: BATCH[type],
      entity,
      type
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  onUploadSuccess (items) {
    debug('success')
    debug(items)
    this.setState({
      items
    })
    Alert.success('CSV read successfully!')
  }

  onUploadFailure (error) {
    debug('error')
    Alert.error(`Failed uploading/reading CSV file: ${JSON.stringify(error)}`)
  }

  render () {
    return (
      <Layout title='Upload CSV file'>
        <h1 className='display-4'>Upload multiple {pluralize(this.props.entity)}</h1>
        <p className='lead'>This page allows you to uplaod multiple {pluralize(this.props.entity)} from a CSV file</p>
        <hr className='my-4' />
        { this.state.items.length === 0 ? (
          <React.Fragment>
            <CSVReader
              cssClass='csv-input'
              label='Select CSV with resources to batch-upload'
              onFileLoaded={(...args) => this.onUploadSuccess(...args)}
              onError={(...args) => this.onUploadFailure(...args)}
              inputId='batchOpsFile'
              parserOptions={{
                header: true
              }}
            />
          </React.Fragment>
        ) : (
          <DedupedList entity={this.props.entity} items={this.state.items} type={this.props.type} />
        )}
      </Layout>
    )
  }
}
