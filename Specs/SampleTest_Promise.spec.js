const config = require('../Configuration/config.json');
let request = require('supertest');
var superagent = require('superagent');
require('superagent-retry')(superagent);
let expected = require('../TestData/expectedData.json');
let input = require('../TestData/inputData.json');

describe('Test the Users API', () => {
    test('It Should respond with the User details', () => {
        return request(config.baseURL).get('users/1')
            .set('Content-Type', 'application/json')
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.data).toMatchObject(expected.userid1)
            })
    });

    test('It Should create a new User', () => {
        return request(config.baseURL).post('users')
            .set('Content-Type', 'application/json')
            .send(input.createUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(201);
                expect(response.body.name).toBe(expected.createdUser.name);
                expect(response.body.job).toBe(expected.createdUser.job);
                expect(response.body).toHaveProperty("id");
                expect(response.body).toHaveProperty("createdAt");;
            })
    });

    test('It Should update the current user with all data', () => {
        return request(config.baseURL).put('users/2')
            .set('Content-Type', 'application/json')
            .send(input.updateUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.name).toBe(expected.updatedUser.name);
                expect(response.body.job).toBe(expected.updatedUser.job);
                expect(response.body).toHaveProperty("updatedAt");
            })
    });

    test('It Should update the current user with some data', () => {
        return request(config.baseURL).patch('users/2')
            .set('Content-Type', 'application/json')
            .send(input.patchUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.job).toBe(expected.patchedUser.job);
                expect(response.body).toHaveProperty("updatedAt");
            })
    });

    test('It Should delete a user', () => {
        return request(config.baseURL).delete('users/2')
            .set('Content-Type', 'application/json')
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(204);;
            })
    });

});