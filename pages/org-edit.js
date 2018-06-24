import React from 'react'

import { default as jsonApi } from '../src/api'
import { entity as cardEntity } from '../src/models/card'
import { setModel, entity } from '../src/models/org'

export default class extends React.Component {
  static async getInitialProps ({ query: { id } }) {
    setModel()
    return {
      initialData: id && await jsonApi.find(entity, id, {
        include: cardEntity
      }),
      schema: {}
    }
  }

  render () {
    return (
      <form>
        <fieldset>
          <legend>Form!</legend>
          <span>{JSON.stringify(this.props.initialData)}</span>
          <span>{JSON.stringify(this.props.schema)}</span>
        </fieldset>
      </form>
    )
  }
}
