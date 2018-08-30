import Router from 'next/router'
import * as React from 'react'
import * as Auth from './index'
import * as Roles from './roles'

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
      if (isAuthenticated) {
        Auth.getProfile().then(profile => {
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

    checkRole(props) {
      return Roles.check(props, this.state.profile)
    }

    render () {
      if (!this.state.hasChecked) {
        return (
          <div>Authenticating...</div>
        )
      }
      if (!this.state.isAuthenticated) {
        Router.replace('/login')
        return null
      }
      console.log('render', this.state.profile)
      if (!this.checkRole(this.props)) {
        console.log('render auth fail')
        Router.push('/not-authorized')
        return null
      }
      return (
        <Page {...this.props} userProfile={this.state.profile} onDemandRoleCheck={props => this.checkRole(props)} />
      )
    }
  }
}
