require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const User = require('../user/User');
const mongoose = require('mongoose');
const Student = require('../student/Student');
const testdb = process.env.TestDB_Url;

describe('server', () => {
    beforeAll(() => {
        return mongoose
            .connect(
                testdb,
                { useNewUrlParser: true }
            )
            .then(console.log('connected to test db'));
    });

    afterAll(() => {
        return mongoose.disconnect();
    });
    //User Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const fakeMail = 'bobtodd@gmail.com';
        const mockUser = { email: 'bobtodd@gmail.com' };
        const createdUser = await User.create(mockUser);
        const response = await request(server)
            .post('/api/user')
            .send(mockUser);
        expect(createdUser.email).toEqual(fakeMail);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('users');
    });
    //Student Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/student');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const fakeMail = 'bobtodd@gmail.com';
        const mockUser = { firstName: 'bob', lastName: 'todd', email: 'bobtodd@gmail.com' };
        const createdUser = await Student.create(mockUser);
        const response = await request(server)
            .post('/api/student')
            .send(mockUser);
        expect(createdUser.email).toEqual(fakeMail);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('students');
    });
    //Rocket Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/rocket');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockTitle = { title: 'bob todd loves extra letters' };
        const response = await request(server)
            .post('/api/rocket')
            .send(mockTitle);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('rockets');
    });
    //Response Rocket Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/responserocket');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockSent = { sent: 55 };
        const response = await request(server)
            .post('/api/responserocket')
            .send(mockSent);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('responserockets');
    });
    //Question Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/question');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockQuestion = {
            title: 'some title',
            explanation: 'some explanation',
            question: 'what is life when you write backend code?',
        };
        const response = await request(server)
            .post('/api/question')
            .send(mockQuestion);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('questions');
    });
    //Cohort Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/cohort');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockCohort = { title: 'some title', rockets: [{ startDate: '1995-12-17T03:24:00' }] };
        const response = await request(server)
            .post('/api/cohort')
            .send(mockCohort);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('cohorts');
    });
});
