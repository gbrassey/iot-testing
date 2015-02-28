'use strict';

var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var bus = require('../lib/bus');

router.get('/votes', function(req, res) {
	Candidate.find({},
		function(err, candidates) {
			if (err) return res.status(400).send(err.toString());

			if (!candidates) {
				return res.status(404).send('No candidates found');
			} else {
				var json = candidates.map(function(candidate) {
					var item = {
						name: candidate.name,
						votes: candidate.getVotes
					};
					return item;
				});
				return res.status(200).json(json);
			}

		}
	);
});

router.post('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;
	var voterName = req.body.voterName;

	Candidate.findOne({ name: candidateName},
		function(err, candidate) {
			if (err) return res.status(400).send(err.toString());

			if (candidate) {
				candidate.upvote(voterName, function() {
					bus.vote();
					res.status(200).send(candidate.getVotes.toString());
				});
			} else {
				candidate = new Candidate({
					name: candidateName,
					votes: [{ name: voterName }]
				});
				candidate.save(function(err) {
					if (err) return res.status(400).send(err.toString());
					return res.status(200).send(candidate.getVotes.toString());
				});
			}

		}
	);

});
router.get('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;

	Candidate.findOne({ name: candidateName },
		function(err, candidate) {
			if (err) return res.status(400).send(err.toString());

			if (!candidate) {
				return res.status(404).send(candidateName + ' not found');
			} else {
				return res.status(200).send(candidate.getVotes.toString());
			}

		}
	);
});

router.delete('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;

	Candidate.remove({ name: candidateName },
		function(err) {
			if (err) return res.status(400).send(err.toString());
			return res.status(200).send(candidateName + ' has been deleted');
		}
	);
});

module.exports = router;
