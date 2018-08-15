require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const User = require('../user/User');
const mongoose = require('mongoose');
const Student = require('../student/Student');
const testdb = process.env.TestDB_Url;

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
        const response = await request(server).post('/api/user').send(mockUser);
        expect(createdUser.email).toEqual(fakeMail);
        expect(response.status).toBe(201);
        mongoose.connection.db.dropCollection('users');
        done();
    });
    test('should return 200 and a response', async (done) => {
        const response = await request(server).get('/api/student');
        expect(response.status).toBe(200);
        done();
    });
    test('should return 201', async (done) => {
        const fakeMail = 'bobtodd@gmail.com';
        const mockUser = {firstName: 'bob', lastName: 'todd', email: 'bobtodd@gmail.com'};
        const createdUser = await Student.create(mockUser);
        const response = await request(server).post('/api/student').send(mockUser);
        expect(createdUser.email).toEqual(fakeMail);
        expect(response.status).toBe(201);
        mongoose.connection.db.dropCollection('students');
        done();
    });
})