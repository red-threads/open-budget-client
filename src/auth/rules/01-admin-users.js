function adminRoles(user, context, callback) {
    function addRolesToUser(user, cb) {
    if (user.email && user.email.endsWith(process.env.ADMIN_EMAIL_DOMAIN)) {
      cb(null, {
        list: [
          {
            entity: 'card',
            id: '*'
          },
          {
            entity: 'home',
            id: '*'
          },
          {
            entity: 'organization',
            id: '*'
          },
          {
            entity: 'transaction',
            id: '*'
          },
          {
            entity: 'transactionType',
            id: '*'
          }
        ],
        read: [
          {
            entity: 'card',
            id: '*'
          },
          {
            entity: 'home',
            id: '*'
          },
          {
            entity: 'organization',
            id: '*'
          },
          {
            entity: 'transaction',
            id: '*'
          },
          {
            entity: 'transactionType',
            id: '*'
          }
        ],
        update: [
          {
            entity: 'card',
            id: '*'
          },
          {
            entity: 'home',
            id: '*'
          },
          {
            entity: 'organization',
            id: '*'
          },
          {
            entity: 'transaction',
            id: '*'
          },
          {
            entity: 'transactionType',
            id: '*'
          }
        ]
      })
    } else {
      cb(null, null)
    }
  }
  user.app_metadata = user.app_metadata || {}

  addRolesToUser(user, function(err, roles) {
    if (err) {
      callback(err)
    } else if (!roles) {
      callback(null, user, context)
    } else {
      user.app_metadata.roles = roles
      auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
        .then(function(){
          callback(null, user, context)
        })
        .catch(function(err){
          callback(err)
        })
    }
  })
}