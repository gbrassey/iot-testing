'use strict';

var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');

/* GET home page. */
router.get('/', function(req, res) {
	Candidate.find({}, function(err, candidates) {
		res.render('index', { title: process.env.WEB_TITLE || 'IOT Test Server', candidates: candidates });
	});
});

module.exports = router;
