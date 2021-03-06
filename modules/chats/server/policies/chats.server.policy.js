'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Chats Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/chats',
      permissions: '*'
    }, {
      resources: '/api/chats/:chatId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/chats',
      permissions: ['get', 'post']
    }, {
      resources: '/api/chats/:chatId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/chats',
      permissions: ['get']
    }, {
      resources: '/api/chats/:chatId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Chats Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Chat is being processed and the current user created it then allow any manipulation
  if (req.chat && req.user && req.chat.user && req.chat.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (true) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
