'use strict';

// var privateConfig = require('./private');

var config = {
	test: {
		mongodb: 'mongodb://localhost/test'
	},
	development: {
		mongodb: 'mongodb://localhost/iot-testing-dev',
		seedDB: true
	},
	production: {
		mongodb: process.env.MONGOLAB_URI || 'mongodb://localhost/iot-testing',
		secrets: require('./secrets')
	}
};

module.exports = config;
