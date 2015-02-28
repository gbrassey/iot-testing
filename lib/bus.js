var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

ee.vote = function vote (name) {
	ee.emit("vote", name);
}

module.exports = ee;
