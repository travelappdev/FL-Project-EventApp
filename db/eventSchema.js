'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  place: String,
  date: String,
  time: String,
  type: String,
  payment: String,
  description: String,
  photoURL: String,
  creator: String
});


module.exports = mongoose.model('Event', EventSchema);
