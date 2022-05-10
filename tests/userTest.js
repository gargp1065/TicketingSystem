//apiTest.js
const request = require('supertest');
const server = require('../server');
describe('POST /register', function () {
    it('registering a user', function (done) {
        let data = {
            "name":"pranjal",
            "email":"hello@gmail.com",
            "password":"asdfgh" 
        }
        request(server)
            .post('/api/users/register')
            .send(data)
            .expect(404, done)
    });
});

describe('POST /login', function () {
    it('logging in a user', function (done) {
        let data = {
            "email":"hello@gmail.com",
            "password":"asdfgh" 
        }
        request(server)
            .post('/api/users/login')
            .send(data)
            .expect(200, done)
    })
})

