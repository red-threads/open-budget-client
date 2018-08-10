import React from 'react'
import * as Auth from '../src/auth'

export default class extends React.Component {
  componentDidMount () {
    Auth.logout()
  }

  render () {
    return (
      <div>Logging you out...</div>
    )
  }
}
