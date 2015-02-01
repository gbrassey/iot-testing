'use strict';

process.env.NODE_ENV = 'test';
var chai = require('chai');
var should = chai.should();
var Candidate = require('../models/candidate');
require('../app');

describe('Candidate Model', function() {
	it('should be an empty db', function(done) {
		Candidate.find({}, function(err, candidates) {
			candidates.should.be.empty;
			done(err);
		});
	});

	it('should create a new candidate', function(done) {
		var candidate = new Candidate({
			name: 'test'
		});
		candidate.save(function(err) {
			done(err);
		});
	});

	it('should not create a candidate with the unique name', function(done) {
		var candidate = new Candidate({
			name: 'test'
		});
		candidate.save(function(err) {
			if (err) err.code.should.equal(11000);
			done();
		});
	});

	it('should find candidate by name', function(done) {
		Candidate.findOne({ name: 'test' }, function(err, candidate) {
			candidate.name.should.equal('test');
			done(err);
		});
	});

	it('should increase the vote count by one', function(done) {
		Candidate.findOne({ name: 'test' }, function(err, candidate) {
			if (err) return done(err);
			candidate.votes.should.be.empty;
			candidate.upvote('test', function(err) {
				candidate.votes.should.have.lengthOf(1);
				candidate.getVotes.should.equal(1);
				done(err);
			})
		})
	})

	it('should delete a candidate', function(done) {
		Candidate.remove({ name: 'test' }, function(err) {
			done(err);
		});
	});

});
