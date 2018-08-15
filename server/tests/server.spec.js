const request = require('supertest');
const server = require('../server');
const User = require('../user/User');
const mongoose = require('mongoose');

describe("server", () => {
    beforeAll(() => {
        return mongoose
            .connect("mongodb://localhost/testing-users")
            .then(console.log("connected to test db"));
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    test('should return 200 and a response', async (done) => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(200);
        done();
    });
})