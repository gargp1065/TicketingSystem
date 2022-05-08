//apiTest.js
const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');
const { afterAll } = require('jest-circus');
describe('GET /register', function () {
    it('respond with json containing a list of all users', function (done) {
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

describe('GET /login', function () {
    afterAll(function(done) {
        mongoose.connection.close();
    })
    it('respond with json containing a list of all users', function (done) {
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

afterAll(function(done) {
    server.close();
    mongoose.connection.close();
})
