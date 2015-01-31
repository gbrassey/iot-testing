'use strict';

var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
  name: { type: String, unique: true, lowercase: true, required: true },
  votes: [{ type: Date, default: Date.now }],

  dateAdded: { type: Date, default: Date.now }
});

candidateSchema.methods.upvote = function(done) {
  this.votes.push(Date());
  this.save(function(err) {
  	done(err);
  });
};

candidateSchema.virtual('getVotes').get(function() {
	return this.votes.length;
});

module.exports = mongoose.model('Candidate', candidateSchema);
