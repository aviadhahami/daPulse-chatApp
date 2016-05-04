'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Chat Schema
 */
var ChatSchema = new Schema({
  message: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String
  }
});

mongoose.model('Chat', ChatSchema);
