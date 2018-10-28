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
    static async getInitialProps (context) {
      const isAuthenticated = Auth.isAuthenticated(context)
      if (!isAuthenticated) {
        debug('NOT AUTHENTICATED')
        if (context && context.res) {
          debug('server side')
          context.res.writeHead(307, {
            Location: '/login'
          })
          context.res.end()
        } else {
          debug('client side')
          Router.push('/login')
        }
        return
      }
      return merge(
        Page.getInitialProps ? await Page.getInitialProps(context) : {},
        {
          authHeader: Auth.getAuthHeaderCookie(context),
          isAuthenticated
        }
      )
    }

    constructor (props) {
      super(props)
      debug('constructor', arguments)
      this.state = {
        isAuthenticated: props.isAuthenticated || false,
        hasCheckedScope: false,
        scope: [],
        authHeader: props.authHeader || ''
      }
    }

    get displayName () {
      return `WithAuth(${childComponentName})`
    }

    componentDidCatch(error, info) {
      debug('cdc')
      debug(error)
      debug(info)
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error }
    }

    componentDidMount () {
      const { scope } = Auth.getSession()
      debug('cdm')
      this.setState({
        hasCheckedScope: true,
        scope
      })
    }

    checkRole (props) {
      debug('checkRole', props)
      return Roles.check(props, this.state.scope)
    }

    render () {
      debug('render', this.props)
      debug('isAuth', this.state.isAuthenticated)
      if (!this.state.isAuthenticated) {
        debug('NOT AUTHENTICATED')
        Router.replace('/login')
        return null
      }
      debug('hasCheckedScope', this.state.hasCheckedScope)
      if (!this.state.hasCheckedScope) {
        return (
          <div>Authenticating...</div>
        )
      }
      debug('scopes', this.state.scope)
      if (!this.checkRole(this.props)) {
        debug('render auth fail')
        Router.push('/not-authorized')
        return null
      }
      return (
        <Page {...this.props} userScopes={this.state.scope} onDemandRoleCheck={props => this.checkRole(props)} />
      )
    }
  }
}
