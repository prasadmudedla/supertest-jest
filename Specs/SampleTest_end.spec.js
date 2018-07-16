const config = require('../Configuration/config.json');
let request = require('supertest');
var superagent = require('superagent');
require('superagent-retry')(superagent);
let expected = require('../TestData/expectedData.json');
let input = require('../TestData/inputData.json');

describe('Test the Users API', () => {
    test('It Should respond with the User details', done => {
        request(config.baseURL).get('users/1')
            .set('Content-Type', 'application/json')
            .retry(3)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    expect(res.statusCode).toBe(200)
                    done();
                } else {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.data).toMatchObject(expected.userid1)
                    done();
                }
            })
    });

    test('It Should create a new User', done => {
        request(config.baseURL).post('users')
            .set('Content-Type', 'application/json')
            .send(input.createUser)
            .retry(3)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    expect(res.statusCode).toBe(201);
                    done();
                } else {
                    expect(res.statusCode).toBe(201);
                    expect(res.body.name).toBe(expected.createdUser.name);
                    expect(res.body.job).toBe(expected.createdUser.job);
                    expect(res.body).toHaveProperty("id");
                    expect(res.body).toHaveProperty("createdAt");
                    done();
                }
            })
    });

    test('It Should update the current user with all data', done => {
        request(config.baseURL).put('users/2')
            .set('Content-Type', 'application/json')
            .send(input.updateUser)
            .retry(3)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    expect(res.statusCode).toBe(200);
                    done();
                } else {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.name).toBe(expected.updatedUser.name);
                    expect(res.body.job).toBe(expected.updatedUser.job);
                    expect(res.body).toHaveProperty("updatedAt");
                    done();
                }
            })
    });

    test('It Should update the current user with some data', done => {
        request(config.baseURL).patch('users/2')
            .set('Content-Type', 'application/json')
            .send(input.patchUser)
            .retry(3)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    expect(res.statusCode).toBe(200);
                    done();
                } else {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.job).toBe(expected.patchedUser.job);
                    expect(res.body).toHaveProperty("updatedAt");
                    done();
                }
            })
    });

    test('It Should delete a user', done => {
        request(config.baseURL).delete('users/2')
            .set('Content-Type', 'application/json')
            .retry(3)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    expect(res.statusCode).toBe(204);
                    done();
                } else {
                    expect(res.statusCode).toBe(204);
                    done();
                }
            })
    });

});