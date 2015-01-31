'use strict';

var Candidate = require('../models/candidate');

Candidate.find({}).remove(function() {
	Candidate.create({
		name: 'test',
		votes: [Date(),Date(),Date(),Date(),Date()]
	}, {
		name: 'george',
		votes: [Date(),Date(),Date(),Date(),Date(),Date(),Date(),Date()]
	}, function() {
			console.log('finished populating candidates');
		}
	);
});
