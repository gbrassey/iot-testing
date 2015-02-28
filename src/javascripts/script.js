'use strict';

var $ = require('jquery');
var socket = require('./lib/socket');
var alert = require('./lib/alert');
var updateList = require('./lib/updateList');

$(document).ready(function() {

	socket.on('vote', function(){

		updateList(function() {

			alert.play();

		});

	});

});
