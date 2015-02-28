'use strict';

var mongoose = require('mongoose');
var bus = require('../lib/bus');

var candidateSchema = new mongoose.Schema({
	name: { type: String, unique: true, lowercase: true, required: true },
	votes: [
		{
			name: String,
			date: { type: Date, default: Date.now }
		}
	],

	dateAdded: { type: Date, default: Date.now }
});

candidateSchema.post('save', function (doc) {
	bus.vote(doc.name);
});

candidateSchema.methods.upvote = function(voterName, done) {
	this.votes.push({name: voterName || ''});
	this.save(function(err) {
		done(err);
	});
};

candidateSchema.virtual('getVotes').get(function() {
	return this.votes.length;
});

module.exports = mongoose.model('Candidate', candidateSchema);
