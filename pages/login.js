import React from 'react'
import * as Auth from '../src/auth'

export default class extends React.Component {
  componentDidMount () {
    Auth.login()
  }

  render () {
    return (
      <div>Wait for the login screen...</div>
    )
  }
}
