require('dotenv').config();
const request = require('supertest');
const server = require('../server');
const User = require('../user/User');
const mongoose = require('mongoose');
const Student = require('../student/Student');
const Rocket = require('../rocket/Rocket');
const ResponseRocket = require('../responserocket/ResponseRocket');
const Question = require('../question/Question');
const Cohort = require('../cohort/Cohort');
const testdb = process.env.TestDB_Url;

describe('server', () => {
    beforeAll(() => {
        return mongoose
            .connect(
                testdb,
                { useNewUrlParser: true }
            )
            .then(() => console.log('connected to test db'));
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
    test('GET should return 200', async () => {
        const mockUser = { email: 'bobtodd@gmail.com' };
        const newUser = await User.create(mockUser);
        const response = await request(server).get(`/api/user/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('users');
    });
    test('PUT should return 201', async () => {
        const mockUser = { email: 'bobtodd@gmail.com' };
        const newUser = await User.create(mockUser);
        const response = await request(server)
            .put(`/api/user/${newUser.id}`)
            .send((newUser.email = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('users');
    });
    test('DEL should return 204', async () => {
        const mockUser = { email: 'bobtodd@gmail.com' };
        const newUser = await User.create(mockUser);
        const response = await request(server).delete(`/api/user/${newUser._id}`);
        expect(response.status).toBe(204);
        await mongoose.connection.db.dropCollection('users');
    });
    //Student Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/student');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockUser = { email: 'bobtodd@gmail.com' };
        const newUser = await User.create(mockUser);
        const id = newUser._id;
        const mockCohort = { title: 'bob', teacher: id };
        const newCohort = await Cohort.create(mockCohort);
        const cohortID = newCohort._id;
        const fakeMail = 'bobtod@gmail.com';
        const mockStudent = { firstName: 'bob', lastName: 'todd', email: 'bobtod@gmail.com' };
        const response = await request(server)
            .post('/api/student')
            .send({
                student: mockStudent,
                teacherID: id,
                cohortID: cohortID,
            });

        expect(mockStudent.email).toEqual(fakeMail);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('students');
    });
    test('GET should return 200', async () => {
        const mockUser = { firstName: 'bob', lastName: 'todd', email: 'bobtodd@gmail.com' };
        const newUser = await Student.create(mockUser);
        const response = await request(server).get(`/api/student/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('students');
    });
    test('PUT should return 201', async () => {
        const mockUser = { firstName: 'bob', lastName: 'todd', email: 'bobtodd@gmail.com' };
        const newUser = await Student.create(mockUser);
        const response = await request(server)
            .put(`/api/student/${newUser._id}`)
            .send((newUser.email = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('students');
    });
    test('DEL should return 204', async () => {
        const mockUser = { firstName: 'bob', lastName: 'todd', email: 'bobtodd@gmail.com' };
        const newUser = await Student.create(mockUser);
        const response = await request(server).delete(`/api/student/${newUser._id}`);
        expect(response.status).toBe(200);
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
    test('GET should return 200', async () => {
        const mockUser = { title: 'bob todd loves extra letters' };
        const newUser = await Rocket.create(mockUser);
        const response = await request(server).get(`/api/rocket/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('rockets');
    });
    test('PUT should return 201', async () => {
        const mockUser = { title: 'bob todd loves extra letters' };
        const newUser = await Rocket.create(mockUser);
        const response = await request(server)
            .put(`/api/rocket/${newUser._id}`)
            .send((newUser.title = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('rockets');
    });
    test('DEL Rockket should return 204', async () => {
        // Fixing Rocket Delete Test
        // Make a User
        const mockUser = { email: 'bobtodd@gmail.com' };
        await User.create(mockUser);
        // Make Cohort
        const mockCohort = { title: 'Cohort Tile' };
        await Cohort.create(mockCohort);
        //Make Question
        const mockQuestion = {
            title: 'some title',
            explanation: 'some explanation',
            question: 'what is life when you write backend code?',
            correct: 'The correct answer is: the matrix!',
        };
        await Question.create(mockQuestion);
        // End of Prep before Rocket Creation and Deletion.
        const mockRocket = { title: 'bob todd loves extra letters' };
        const newRocket = await Rocket.create(mockRocket);
        const response = await request(server).delete(`/api/rocket/${newRocket._id}`);
        // Debugging: 2 lines below, please do not delete yet.
        // console.log(response.body.message)
        // expect(response).toBe('')
        expect(response.status).toBe(204);
        await mongoose.connection.db.dropCollection('rockets');
        // Drop prep Collections
        await mongoose.connection.db.dropCollection('cohorts');
        await mongoose.connection.db.dropCollection('questions');
        await mongoose.connection.db.dropCollection('users');
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
    test('GET should return 200', async () => {
        const mockUser = { title: 'bob todd loves extra letters' };
        const newUser = await ResponseRocket.create(mockUser);
        const response = await request(server).get(`/api/responserocket/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('responserockets');
    });
    test('PUT should return 201', async () => {
        const mockUser = { title: 'bob todd loves extra letters' };
        const newUser = await ResponseRocket.create(mockUser);
        const response = await request(server)
            .put(`/api/responserocket/${newUser._id}`)
            .send((newUser.title = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('responserockets');
    });
    test('DEL should return 204', async () => {
        const mockUser = { title: 'bob todd loves extra letters' };
        const newUser = await ResponseRocket.create(mockUser);
        const response = await request(server).delete(`/api/responserocket/${newUser._id}`);
        expect(response.status).toBe(204);
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
            correct: '{type: String, required: true}',
        };
        const response = await request(server)
            .post('/api/question')
            .send(mockQuestion);
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('questions');
    });
    test('GET should return 200', async () => {
        const mockQuestion = {
            title: 'some title',
            explanation: 'some explanation',
            question: 'what is life when you write backend code?',
            correct: '{type: String, required: true}',
        };
        const newUser = await Question.create(mockQuestion);
        const response = await request(server).get(`/api/question/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('questions');
    });
    test('PUT should return 201', async () => {
        const mockQuestion = {
            title: 'some title',
            explanation: 'some explanation',
            question: 'what is life when you write backend code?',
            correct: '{type: String, required: true}',
        };
        const newUser = await Question.create(mockQuestion);
        const response = await request(server)
            .put(`/api/question/${newUser._id}`)
            .send((newUser.title = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('questions');
    });
    test('DEL should return 204', async () => {
        const mockQuestion = {
            title: 'some title',
            explanation: 'some explanation',
            question: 'what is life when you write backend code?',
            correct: '{type: String, required: true}',
        };
        const newUser = await Question.create(mockQuestion);
        const response = await request(server).delete(`/api/question/${newUser._id}`);
        expect(response.status).toBe(204);
        await mongoose.connection.db.dropCollection('questions');
    });
    //Cohort Tests
    test('should return 200 and a response', async () => {
        const response = await request(server).get('/api/cohort');
        expect(response.status).toBe(200);
    });
    test('should return 201', async () => {
        const mockUser = { email: 'bobtodd@gmail.com' };
        const newUser = await User.create(mockUser);
        const id = newUser._id;
        const mockCohort = { title: 'some title' };
        const response = await request(server)
            .post('/api/cohort')
            // const cohort = new Cohort(req.body.cohort);
            // const id = req.body.id;
            // You have to pass in an object and with prop cohort and just id
            .send({ cohort: mockCohort, id });
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('cohorts');
    });
    test('GET should return 200', async () => {
        const mockUser = { title: 'bob' };
        const newUser = await Cohort.create(mockUser);
        const response = await request(server).get(`/api/cohort/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('cohorts');
    });
    test('PUT should return 201', async () => {
        const mockUser = { title: 'bob' };
        const newUser = await Cohort.create(mockUser);
        const response = await request(server)
            .put(`/api/cohort/${newUser._id}`)
            .send((newUser.title = 'bobtodd1@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('cohorts');
    });
    test('DEL should return 204', async () => {
        const mockUser = { title: 'bob' };
        const newUser = await Cohort.create(mockUser);
        const response = await request(server).delete(`/api/cohort/${newUser._id}`);
        expect(response.status).toBe(204);
        await mongoose.connection.db.dropCollection('cohorts');
    });
});
