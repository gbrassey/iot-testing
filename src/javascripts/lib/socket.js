var socket = require('socket.io-client').connect();
var alert = require('../lib/alert');

socket.on('connect', function(){
	console.log('socket connect');
});
socket.on('disconnect', function(){
	console.log('socket disconnect');
});
socket.on('vote', function(data){
	alert.play();
});
