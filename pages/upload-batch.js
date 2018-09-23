import Debug from 'debug'
import React from 'react'
import CSVReader from 'react-csv-reader'
import Alert from 'react-s-alert'
import pluralize from 'pluralize'

import { BATCH } from '../src/auth/roles'
import Layout from '../src/components/layout/Layout'

const debug = Debug('ob:c:pages:upload-batch')

export default class UploadBatch extends React.Component {
  static async getInitialProps ({ query: { entity, mapper, type } }) {
    debug(type)
    debug(mapper)
    debug(entity)
    return {
      action: BATCH[type],
      entity,
      mapper
    }
  }

  onUploadSuccess (data) {
    debug('success')
    debug(data)
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
        <p className="lead">This page allows you to uplaod multiple transactions from a CSV file</p>
        <hr className="my-4" />
        <CSVReader
          cssClass='csv-input'
          label='Select CSV with resources to batch-upload'
          onFileLoaded={this.onUploadSuccess}
          onError={this.onUploadFailure}
          inputId='batchOpsFile'
        />
      </Layout>
    )
  }
}
