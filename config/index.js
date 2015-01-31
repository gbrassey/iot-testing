'use strict';

// var privateConfig = require('./private');

var config = {
	test: {
		mongodb: 'mongodb://localhost/test'
	},
	development: {
		mongodb: 'mongodb://localhost/novalia-testing-dev',
		seedDB: true
	},
	production: {
		mongodb: process.env.MONGOLAB_URI || 'mongodb://localhost/novalia-testing',
		secrets: require('./secrets')
	}
};

module.exports = config;
