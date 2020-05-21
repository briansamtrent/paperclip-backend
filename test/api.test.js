const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:8080');

// user

// expect to receive posted user response
describe('POST /api/user', () => {
	let data = {
		userName: 'testUser',
		email: 'test@user.com',
		password: 'testpass',
	};
	it('should return data for the new user', (done) => {
		api
			.post('/api/user')
			.send(data)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('object');
				done();
			});
	});
});

// tier

// expect to receive array of tiers for the user
describe('GET /api/tier', () => {
	let firstId;
	before((done) => {
		api
			.get('/api/user')
			.set('Accept', 'application/json')
			.end((error, response) => {
				firstId = response.body[0]._id;
				done();
			});
	});

	it('should return tiers for the first user', (done) => {
		api
			.get(`/api/user/${firstId}/tier`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// item

// expect to receive array of items back that are listed for user
describe('GET /api/item', () => {
	let firstId;
	before((done) => {
		api
			.get('/api/user')
			.set('Accept', 'application/json')
			.end((error, response) => {
				firstId = response.body[0]._id;
				done();
			});
	});

	it('should return items for the first user', (done) => {
		api
			.get(`/api/item/${firstId}`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// need

// expect to receive array of needs back that are listed for user
describe('GET /api/need', () => {
	let firstId;
	before((done) => {
		api
			.get('/api/user')
			.set('Accept', 'application/json')
			.end((error, response) => {
				firstId = response.body[0]._id;
				done();
			});
	});

	it('should return needs for the first user', (done) => {
		api
			.get(`/api/need/${firstId}`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// link

// expect to receive unconfirmed links back that are listed for user
describe('GET /api/need', () => {
	let firstId;
	before((done) => {
		api
			.get('/api/user')
			.set('Accept', 'application/json')
			.end((error, response) => {
				firstId = response.body[0]._id;
				done();
			});
	});

	it('should return an array of unconfirmed links for the first user', (done) => {
		api
			.get(`/api/link/${firstId}/unconfirmed`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// cycle

// expect to receive completed cycles back that are in the system
describe('GET /api/cycle', () => {
	it('should return an array of completed cycles', (done) => {
		api
			.get(`/api/cycle`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// category

// expect to receive list of categories listed in system
describe('GET /api/category', () => {
	it('should return an array of categories available', (done) => {
		api
			.get(`/api/category`)
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});
