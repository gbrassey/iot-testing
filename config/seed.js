'use strict';

var Candidate = require('../models/candidate');

Candidate.find({}).remove(function() {
	Candidate.create({
		name: 'test',
		votes: [{name: 'george'}]
	}, {
		name: 'george',
		votes: [{name: 'tester'}, {name: 'test'}]
	}, function() {
			console.log('finished populating candidates');
		}
	);
});
