function accessTokenScopes (user, context, callback) {
  console.log(context.clientName)
  if (context.clientName !== 'Open Budget') {
    return callback(null, user, context)
  }

  const permissions = user.permissions || []
  const requestedScopes = context.request.body.scope || context.request.query.scope
  console.log('req', requestedScopes)
  const filteredScopes = requestedScopes.split(' ').filter(x => x.indexOf(':') < 0)
  console.log('filt', filteredScopes)
  Array.prototype.push.apply(filteredScopes, permissions)
  context.accessToken.scope = filteredScopes.join(' ')

  callback(null, user, context)
}
