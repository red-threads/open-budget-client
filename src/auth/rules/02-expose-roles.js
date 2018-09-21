function exposeRoles (user, context, callback) {
  const namespace = process.env.OIDC_NAMESPACE
  context.idToken[`${namespace}/roles`] = (user.app_metadata || {}).roles
  callback(null, user, context)
}
