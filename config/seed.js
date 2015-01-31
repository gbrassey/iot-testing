'use strict';

var Candidate = require('../models/candidate');

Candidate.find({}).remove(function() {
	Candidate.create({
		name: 'test',
		votes: [1,1,1,1,1]
	}, {
		name: 'george',
		votes: [1,1,1,1,1,1,1,1]
	}, function() {
			console.log('finished populating candidates');
		}
	);
});
