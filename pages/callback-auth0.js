import Debug from 'debug'
import Link from 'next/link'
import React from 'react'
import * as Auth from '../src/auth'

const debug = Debug('ob:c:pages:callback-auth0')

export default class extends React.Component {
  componentDidMount() {
    Auth.handleAuthentication()
  }

  render () {
    return (
      <div>Callback! A redirect should happen soon. If it doesn't, <Link href="/home"><a>you can still go to the home page</a></Link></div>
    )
  }
}

