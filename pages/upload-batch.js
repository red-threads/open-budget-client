import Debug from 'debug'
import React from 'react'
import CSVReader from 'react-csv-reader'
import Alert from 'react-s-alert'
import pluralize from 'pluralize'

import { BATCH } from '../src/auth/roles'
import { default as Layout } from '../src/components/layout/Layout'

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

  onUploadSuccess(data) {
    debug('success')
    debug(data)
    Alert.success('CSV read successfully!')
  }

  onUploadFailure(error) {
    debug('error')
    Alert.error(`Failed uploading/reading CSV file: ${JSON.stringify(error)}`)
  }

  render() {
    return (
      <Layout title='Upload CSV file'>
        <h1>Upload multiple {pluralize(this.props.entity)}</h1>
        <p>This page allows you to uplaod multiple transactions from a CSV file</p>
        <main>
          <CSVReader
            cssClass="csv-input"
            label="Select CSV with resources to batch-upload"
            onFileLoaded={this.onUploadSuccess}
            onError={this.onUploadFailure}
            inputId="batchOpsFile"
          />
        </main>
      </Layout>
    )
  }
}
