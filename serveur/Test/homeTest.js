/* eslint-disable linebreak-style */
/* eslint-disable no-undef */


const request = require('supertest');
const app = require('../main');

describe('GET /api/test', () => {
  it('respond with Hello World', (done) => {
    request(app).get('/api/allUsers').expect(200, done);
  });
});
