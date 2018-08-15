const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// Import Models Here
const StudentRouter = require('./student/StudentRouter');
const AuthRouter = require('./auth/AuthRouter');
const UserRouter = require('./user/UserRouter');
const RocketRouter = require('./rocket/RocketRouter');
const ResponseRocketRouter = require('./responserocket/ResponseRocketRouter');
const QuestionRouter = require('./question/QuestionRouter');
const CohortRouter = require('./cohort/CohortRouter');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.static("../client/build/"));

server.use('/api/student', StudentRouter);
server.use('/api/auth/', AuthRouter);
server.use('/api/rocket', RocketRouter);
server.use('/api/user', UserRouter);
server.use('/api/responserocket', ResponseRocketRouter);
server.use('/api/question', QuestionRouter);
server.use('/api/cohort', CohortRouter);

module.exports = server;
