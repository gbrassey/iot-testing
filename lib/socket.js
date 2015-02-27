'use strict';

var ee = require('../lib/bus');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.on('connection', function(){ console.log('connected socket') });

	ee.on('vote', function() {
		io.emit('vote');
	});

	return io;

}

module.exports = socket;
