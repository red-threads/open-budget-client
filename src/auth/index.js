import Auth0 from 'auth0-js'
import Debug from 'debug'
import Router from 'next/router'

const debug = Debug('ob:c:auth:index')
let provider
function getProvider () {
  if (!provider) {
    debug(`${window.location.origin}/callback-auth0`)
    provider = new Auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile'
    })
  }
  return provider
}

export function login () {
  getProvider().authorize()
}

export function handleAuthentication () {
  getProvider().parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult)
      Router.replace('/home')
    } else if (err) {
      Router.replace('/not-authorized')
      console.log(err)
    }
  })
}

export function setSession (authResult) {
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
  global.localStorage.setItem('access_token', authResult.accessToken)
  global.localStorage.setItem('id_token', authResult.idToken)
  global.localStorage.setItem('expires_at', expiresAt)
  Router.replace('/home')
}

export function logout () {
  global.localStorage.removeItem('access_token')
  global.localStorage.removeItem('id_token')
  global.localStorage.removeItem('expires_at')
  Router.replace('/')
}

export function isAuthenticated () {
  const expiresAt = JSON.parse(global.localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export function getAccessToken () {
  const accessToken = global.localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('No Access Token found')
  }
  return accessToken
}

export function getProfile () {
  return new Promise((resolve, reject) => {
    if (process.env.IS_LOCAL) {
      debug('will go local')
      return resolve(JSON.parse(global.localStorage.getItem('profile')))
    }
    debug('will fetch remote profile')
    getProvider().client.userInfo(getAccessToken(), (err, profile) => {
      console.log('profile!')
      console.log(profile)
      if (err) {
        return reject(err)
      }
      return resolve(profile)
    })
  })
}
