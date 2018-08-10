import Router from 'next/router'
import * as React from 'react'
import * as Auth from './index'

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
      this.setState({
        hasChecked: true,
        isAuthenticated
      })
      if (isAuthenticated) {
        Auth.getProfile().then(profile => {
          this.setState({ profile })
        })
      }
    }
    /*
    componentDidUpdate() {
      if (!this.state.hasChecked) {
        const isAuthenticated = Auth.isAuthenticated()
        this.setState({
          hasChecked: true,
          isAuthenticated
        })
        if (isAuthenticated) {
          this.getProfile()
        }
      }
    } */

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
      return (
        <Page {...this.props} userProfile={this.state.profile} />
      )
    }
  }
}
