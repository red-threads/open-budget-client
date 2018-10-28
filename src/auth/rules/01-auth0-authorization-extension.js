/*
*  This rule been automatically generated by auth0-authz-extension
*  Updated by rocco@js.cr, 2018-10-19T07:47:21.779Z
 */
function (user, context, callback) {
  var _ = require('lodash');
  var EXTENSION_URL = "https://redthreads.eu.webtask.io/adf6e2f2b84784b57522e3b19dfc9201";

  var audience = '';
  audience = audience || (context.request && context.request.query && context.request.query.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  audience = audience || (context.request && context.request.body && context.request.body.audience);
  if (audience === 'urn:auth0-authz-api') {
    return callback(new UnauthorizedError('no_end_users'));
  }

  getPolicy(user, context, function(err, res, data) {
    if (err) {
      console.log('Error from Authorization Extension:', err);
      return callback(new UnauthorizedError('Authorization Extension: ' + err.message));
    }

    if (res.statusCode !== 200) {
      console.log('Error from Authorization Extension:', res.body || res.statusCode);
      return callback(
        new UnauthorizedError('Authorization Extension: ' + ((res.body && (res.body.message || res.body) || res.statusCode)))
      );
    }

    // Update the user object.
    user.permissions = data.permissions;

    // Store this in the user profile (app_metadata).
    saveToMetadata(user, data.groups, data.roles, data.permissions, function(err) {
      return callback(err, user, context);
    });
  });

  // Get the policy for the user.
  function getPolicy(user, context, cb) {
    request.post({
      url: EXTENSION_URL + "/api/users/" + user.user_id + "/policy/" + context.clientID,
      headers: {
        "x-api-key": "9e0243ac913d92481599f8ab17ac9fcc99c2e3a56aa7bc687f1be9fd084329f4"
      },
      json: {
        connectionName: context.connection || user.identities[0].connection,
        groups: user.groups
      },
      timeout: 5000
    }, cb);
  }

  // Store authorization data in the user profile so we can query it later.
  function saveToMetadata(user, groups, roles, permissions, cb) {
    user.app_metadata = user.app_metadata || {};
    user.app_metadata.authorization = {
      permissions: permissions
    };

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      cb();
    })
    .catch(function(err){
      cb(err);
    });
  }
}