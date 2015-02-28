'use strict';

var $ = require('jquery');

function getVotes (callback) {
	$.getJSON('/http/votes', function(candidates) {
		callback(candidates);
	});
}

module.exports = getVotes;
