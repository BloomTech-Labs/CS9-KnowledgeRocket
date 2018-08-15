require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const User = require('../user/User');
const mongoose = require('mongoose');
const testdb = process.env.TestDB_Url

describe("server", () => {
    beforeAll(() => {
        return mongoose
            .connect(testdb, { useNewUrlParser: true })
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
    test('should return 201', async (done) => {
        const fakeMail = 'bobtodd@gmail.com';
        const mockUser = {email: 'bobtodd@gmail.com'};
        const createdUser = await User.create(mockUser);
        const response = await request(server).get('/api/user');
        expect(createdUser.email).toEqual(fakeMail);
        mongoose.connection.db.dropCollection('users');
        done();
    });
})