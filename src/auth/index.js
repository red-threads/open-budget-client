import Auth0 from 'auth0-js'
import Debug from 'debug'
import Router from 'next/router'

const debug = Debug('ob:c:auth:index')
let provider
const ROUTES = {
  LOGGED_IN: '/home',
  LOGGED_OUT: '/',
  UNAUTHORIZED: '/not-authorized'
}
const ACCESS_TOKEN_KEY = 'access_token'
const ID_TOKEN_KEY = 'id_token'
const EXPIRES_AT_KEY = 'expires_at'

function getProvider () {
  const audience = `https://${process.env.AUTH0_DOMAIN}/userinfo`
  const redirectUri = `${global.location.origin}/callback-auth0`
  if (!provider) {
    debug('redirectUri', redirectUri)
    debug('audience', audience)
    provider = new Auth0.WebAuth({
      audience,
      clientID: process.env.AUTH0_CLIENT_ID,
      domain: process.env.AUTH0_DOMAIN,
      redirectUri,
      responseType: `token ${ID_TOKEN_KEY}`,
      scope: 'openid profile'
    })
  }
  return provider
}

function getNamespacedClaim(customClaim) {
  return `${process.env.OIDC_NAMESPACE}/${customClaim}`
}

export function login () {
  getProvider().authorize()
}

export function handleAuthenticationCallback () {
  getProvider().parseHash((err, authResult) => {
    debug('err', err)
    debug('auth', authResult)
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
      Router.replace(ROUTES.LOGGED_IN)
    } else if (err) {
      Router.replace(ROUTES.UNAUTHORIZED)
    }
  })
}

function setSession (authResult) {
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
  global.localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken)
  global.localStorage.setItem(ID_TOKEN_KEY, authResult.idToken)
  global.localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
  Router.replace(ROUTES.LOGGED_IN)
}

export function logout () {
  global.localStorage.removeItem(ACCESS_TOKEN_KEY)
  global.localStorage.removeItem(ID_TOKEN_KEY)
  global.localStorage.removeItem(EXPIRES_AT_KEY)
  Router.replace(ROUTES.LOGGED_OUT)
}

export function isAuthenticated () {
  const expiresAt = JSON.parse(global.localStorage.getItem(EXPIRES_AT_KEY))
  return new Date().getTime() < expiresAt
}

function getAccessToken () {
  const accessToken = global.localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!accessToken) {
    throw new Error('No Access Token found')
  }
  return accessToken
}

export function getProfile () {
  return new Promise((resolve, reject) => {
    debug('islocal?', process.env.IS_LOCAL)
    if (process.env.IS_LOCAL) {
      debug('will go local')
      return resolve(JSON.parse(global.localStorage.getItem('profile')))
    }
    debug('will fetch remote profile')
    getProvider().client.userInfo(getAccessToken(), (err, profile) => {
      debug('profile!', profile)
      if (err) {
        return reject(err)
      }
      const userRolesClaim = getNamespacedClaim('roles')
      debug('claim', userRolesClaim)
      debug('roles to return', profile[userRolesClaim])
      if (!profile[userRolesClaim]) {
        return reject(new Error(`Claim ${userRolesClaim} not found on the profile!`))
      }
      return resolve(profile[userRolesClaim])
    })
  })
}
