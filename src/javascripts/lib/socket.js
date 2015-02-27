var socket = require('socket.io-client').connect();

socket.on('connect', function(){
	console.log('socket connect');
});
socket.on('disconnect', function(){
	console.log('socket disconnect');
});
socket.on('vote', function(data){
	console.log('vote');
});
