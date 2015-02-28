'use strict';

var $ = require('jquery');
var getVotes = require('../lib/getVotes');
var buildList = require('../lib/buildList');

function updateList (callback) {
	getVotes(function(candidates) {
		var list = buildList(candidates);

		$('#vote-list').empty()
			.append(list);
		callback();
	});
}

module.exports = updateList;
