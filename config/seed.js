'use strict';

var Candidate = require('../models/candidate');

Candidate.find({}).remove(function() {
	Candidate.create({
		name: 'test'
	}, {
		name: 'george',
		votes: [{name: 'tester'}]
	}, function() {
			console.log('finished populating candidates');
		}
	);
});
