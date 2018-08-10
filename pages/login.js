import Debug from 'debug'
import React from 'react'
import * as Auth from '../src/auth'

const debug = Debug('ob:c:pages:login')

export default class extends React.Component {
  componentDidMount() {
    Auth.login()
  }

  render () {
    return (
      <div>Wait for the login screen...</div>
    )
  }
}
