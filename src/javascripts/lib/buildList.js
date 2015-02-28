'use strict';

var $ = require('jquery');
var getVotes = require('../lib/getVotes');

function buildList (candidates) {
	var items = [];

	$.each(candidates, function(index, candidate) {
		items.push('<li id="' + candidate.name + '"><a href="/http/votes/' + candidate.name + '">' + candidate.name + '</a>: <span class="votes">' + candidate.votes + '</span> votes</li>');
	});
	return items;
}

module.exports = buildList;
