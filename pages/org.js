import React from 'react'
import { findOneOrAll } from '../src/api'

import { entity as cardEntity } from '../src/models/card'
import { setModel, entity } from '../src/models/org'

export default class extends React.Component {
  static async getInitialProps ({ query: { id } }) {
    setModel()
    return findOneOrAll({
      entity,
      id,
      options: {
        include: cardEntity
      }
    })
  }

  render () {
    if (this.props.errors) {
      return <div style={{ backgroundColor: 'red', color: 'white' }}>{JSON.stringify(this.props.errors, '\t', 2)}</div>
    }
    return (
      <div>
        Hello World {JSON.stringify(this.props.data)}
      </div>
    )
  }
}
