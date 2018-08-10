import Debug from 'debug'
import React from 'react'
import * as Auth from '../src/auth'

const debug = Debug('ob:c:pages:logout')

export default class extends React.Component {
  componentDidMount() {
    Auth.logout()
  }

  render () {
    return (
      <div>Logging you out...</div>
    )
  }
}

