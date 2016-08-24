'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  place: String,
  date: Date,
  time: Number,
  type: String,
  payment: Number,
  description: String
});


module.exports = mongoose.model('Event', EventSchema);
