'use strict';

var mongoose = require('mongoose');
var Candidate = require('./candidate');

var voteSchema = new mongoose.Schema({
	_candidate: Candidate,
	by: String,
	date: { type: Date, default: Date.now }
});

module.exports = voteSchema;
