'use strict';

var bus = require('../lib/bus');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.on('connection', function(){ console.log('connected socket') });

	bus.on('vote', function(name) {
		io.emit('vote', name);
	});

	return io;

}

module.exports = socket;
