import Debug from 'debug'
import Router from 'next/router'
import * as React from 'react'
import { merge } from 'timm'
import * as Auth from './index'
import * as Roles from './roles'

const debug = Debug('ob:c:auth:hoc-with-auth')

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default function withAuth (Page) {
  const childComponentName = getDisplayName(Page)

  return class WithAuth extends React.Component {
    constructor (...props) {
      super(...props)
      this.state = {
        isAuthenticated: false,
        hasChecked: false,
        profile: {}
      }
    }

    get displayName () {
      return `WithAuth(${childComponentName})`
    }

    static async getInitialProps (...args) {
      return Page.getInitialProps ? Page.getInitialProps(...args) : {}
    }

    componentDidMount () {
      const isAuthenticated = Auth.isAuthenticated()
      debug('cdm')
      debug(isAuthenticated)
      if (isAuthenticated) {
        Auth.getProfile().then(profile => {
          debug('gotProfile', profile)
          this.setState({
            hasChecked: true,
            isAuthenticated,
            profile
          })
        })
      } else {
        this.setState({
          hasChecked: true,
          isAuthenticated,
          profile: null
        })
      }
    }

    checkRole (props) {
      debug('checkRole', props)
      return Roles.check(props, this.state.profile)
    }

    render () {
      debug('render', this.props)
      debug('hasChecked', this.state.hasChecked)
      if (!this.state.hasChecked) {
        return (
          <div>Authenticating...</div>
        )
      }
      debug('isAuth', this.state.isAuthenticated)
      if (!this.state.isAuthenticated) {
        Router.replace('/login')
        return null
      }
      debug('profile', this.state.profile)
      if (!this.checkRole(this.props)) {
        debug('render auth fail')
        Router.push('/not-authorized')
        return null
      }
      return (
        <Page {...this.props} userProfile={this.state.profile} onDemandRoleCheck={props => this.checkRole(props)} />
      )
    }
  }
}
