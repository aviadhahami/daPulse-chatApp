'use strict';

/**
 * Module dependencies
 */
var chatsPolicy = require('../policies/chats.server.policy'),
  chats = require('../controllers/chats.server.controller');

module.exports = function(app) {
  // Chats Routes
  app.route('/api/getNewMessages').all(chatsPolicy.isAllowed)
    .post(chats.getMessages);

  app.route('/api/postMessage').all(chatsPolicy.isAllowed)
    .post(chats.create);
};
