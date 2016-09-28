'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  username: {type: String, required: true },
  age: String,
  gender: String,
  phone: String,
  homeTown: String,
  interests: String,
  subscribed: String,
  userPhoto: String,
  createdEvents: String
});


module.exports = mongoose.model('User', UserSchema);
