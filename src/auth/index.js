import Auth0 from 'auth0-js'
import Router from 'next/router'
import { resolve } from 'url';

let provider
function getProvider() {
  if (!provider) {
    provider = new Auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}/callback-auth0`,
      audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile'
    })
  }
  return provider
}

export function login() {
  getProvider().authorize()
}

export function handleAuthentication() {
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

export function setSession(authResult) {
  let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
  localStorage.setItem('access_token', authResult.accessToken)
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('expires_at', expiresAt)
  Router.replace('/home')
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('id_token')
  localStorage.removeItem('expires_at')
  Router.replace('/')
}

export function isAuthenticated() {
  const expiresAt = JSON.parse(global.localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export function getAccessToken() {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('No Access Token found')
  }
  return accessToken
}

export function getProfile() {
  let accessToken = getAccessToken()
  return new Promise((resolve, reject) => {
    getProvider().client.userInfo(accessToken, (err, profile) => {
      console.log('profile!')
      console.log(profile)
      if (err) {
        return reject(err)
      }
      return resolve(profile)
    })
  })
}
