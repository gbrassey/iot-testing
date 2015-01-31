'use strict';

process.env.NODE_ENV = 'test';
var app = require('../app.js');
var request = require('supertest');
var agent = request.agent(app);

describe('POST /http/votes/:candidate', function() {
  it('should create a new candidate and increase the vote by one', function(done) {
  	agent
      .post('/http/votes/test')
      .send()
		  .expect(200, done);
  });
});
describe('GET /http/votes/:candidate', function() {
  it('should get the number of votes', function(done) {
  	agent
      .get('/http/votes/test')
      .send()
		  .expect(200, done);
  });
});
describe('DELETE /http/votes/:candidate', function() {
	it('should delete the candidate',
		function(done) {
			agent
				.delete('/http/votes/test')
				.send()
					.expect(200, done);
		}
	);
});
