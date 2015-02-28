var EventEmitter = require("events").EventEmitter;
var bus = new EventEmitter();

bus.vote = function vote (name) {
	this.emit('vote', name);
}

module.exports = bus;
