'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema(
  {name: String,
  	labels: Array,
  	values: Array},
  {versionKey: false}
);

module.exports = mongoose.model('Poll', Poll);
