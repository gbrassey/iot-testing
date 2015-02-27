var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

ee.vote = function vote () {
	ee.emit("vote");
}

module.exports = ee;
