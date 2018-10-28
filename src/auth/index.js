import Auth0 from 'auth0-js'
import Debug from 'debug'
import Router from 'next/router'
import { merge } from 'timm'
import { remove as removeCookie, save as setCookie, load as getCookie } from 'isomorphic-cookie'

const debug = Debug('ob:c:auth:index')
const { host: domain } = new global.URL(process.env.JWT_ISSUER)
const ROUTES = {
  LOGGED_IN: '/home',
  LOGGED_OUT: '/',
  UNAUTHORIZED: '/not-authorized'
}
const AUTH_SESSION_KEY = 'obc_session'
const COOKIE_AUTH_HEADER_KEY = 'obc_auth_header'

let authHeaderCookie
let provider
export let session = {}

function getProvider () {
  // const audience = process.env.API_ENDPOINT
  const redirectUri = `${global.location.origin}/callback-auth0`
  if (!provider) {
    debug('redirectUri', redirectUri)
    provider = new Auth0.WebAuth({
      audience: process.env.JWT_AUDIENCE,
      clientID: process.env.AUTH0_CLIENT_ID,
      domain,
      redirectUri,
      responseType: 'token id_token',
      scope: 'openid profile list:home'
    })
  }
  return provider
}

export function login () {
  if (process.env.IS_LOCAL) {
    setSession({
      accessToken: process.env.LOCAL_ACCESS_TOKEN,
      expiresIn: 86400,
      scope: process.env.LOCAL_SCOPE
    })
    Router.replace(ROUTES.LOGGED_IN)
    return
  }
  getProvider().authorize()
}

export function handleAuthenticationCallback () {
  debug('getProvider')
  getProvider().parseHash((err, authResult) => {
    debug('parseHash')
    debug('err', err)
    debug('auth', authResult)
    if (authResult && authResult.accessToken) {
      debug('will set session / replace url')
      setSession(authResult)
      Router.replace(ROUTES.LOGGED_IN)
    } else if (err) {
      Router.replace(ROUTES.UNAUTHORIZED)
    }
  })
}

function setSession (authResult, { clear = false } = {}) {
  debug('setSession')
  if (clear) {
    debug('clear session')
    session = {}
    removeCookie(COOKIE_AUTH_HEADER_KEY)
  } else if (!authResult.expiresIn || !authResult.tokenType || !authResult.accessToken) {
    throw new Error('Invalid session')
  } else {
    debug('will set new session')
    const expiresIn = Number(JSON.stringify((authResult.expiresIn * 1000) + Date.now()))
    session = merge(authResult, {
      expiresIn,
      scope: authResult.scope.split(' '),
      authHeader: `${authResult.tokenType} ${authResult.accessToken}`
    })
    debug(COOKIE_AUTH_HEADER_KEY, session.authHeader)
    setCookie(COOKIE_AUTH_HEADER_KEY, session.authHeader, {
      expires: new Date(expiresIn),
      secure: Boolean(global.location.protocol === 'https:')
    })
  }
  global.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function getSession(key, ctx) {
  debug('getSession')
  if (!session.authHeader) {
    debug('no in-memory session header')
    session = typeof global.localStorage !== 'undefined' ?
      JSON.parse(global.localStorage.getItem(AUTH_SESSION_KEY)) : 
      {
        authHeader: getAuthHeaderCookie(ctx)
      }
    debug('now there is', session)
  }
  return key ? session[key] : session
}

export function logout () {
  setSession(null, { clear: true })
  Router.replace(ROUTES.LOGGED_OUT)
}

export function getAuthHeaderCookie(ctx = {}) {
  if (!authHeaderCookie) {
    authHeaderCookie = getCookie(COOKIE_AUTH_HEADER_KEY, ctx.req)
  }
  return authHeaderCookie
}

export function isAuthenticated (ctx = {}) {
  debug('isAuth')
  return Boolean(getAuthHeaderCookie(ctx))
}
