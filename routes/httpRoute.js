'use strict';

var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');

router.post('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;
	var voterName = req.body.voterName;

	Candidate.findOne({ name: candidateName},
		function(err, candidate) {
			if (err) return res.status(400).json({err: err});

			if (candidate) {
				candidate.upvote(voterName, function() {
					res.status(200).json(candidate);
				});
			} else {
				candidate = new Candidate({
					name: candidateName,
					votes: [{ name: voterName }]
				});
				candidate.save(function(err) {
					if (err) return res.status(400).json({err: err});
					return res.status(200).json(candidate);
				});
			}

		}
	);

});
router.get('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;

	Candidate.findOne({ name: candidateName },
		function(err, candidate) {
			if (err) return res.status(400).json({err: err});

			if (!candidate) {
				return res.status(404).json({msg: candidateName + ' not found'});
			} else {
				return res.status(200).json(candidate);
			}

		}
	);
});

router.delete('/votes/:candidate', function(req, res) {

	var candidateName = req.params.candidate;

	Candidate.remove({ name: candidateName },
		function(err) {
			if (err) return res.status(400).json({err: err});
			return res.status(200).json({msg: candidateName + ' has been deleted'});
		}
	);
});

module.exports = router;
