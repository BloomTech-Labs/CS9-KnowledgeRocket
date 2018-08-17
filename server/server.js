require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const CORS = require('cors');
const stripe = require('stripe')('sk_test_3Lvm44fVS3KeNWZ7sQARZfKx');
// Import Models Here
const StudentRouter = require('./student/StudentRouter');
const AuthRouter = require('./auth/AuthRouter');
const UserRouter = require('./user/UserRouter');
const RocketRouter = require('./rocket/RocketRouter');
const ResponseRocketRouter = require('./responserocket/ResponseRocketRouter');
const QuestionRouter = require('./question/QuestionRouter');
const CohortRouter = require('./cohort/CohortRouter');

const server = express();
const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Begin code for cross-site allowances -------------------------------------
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cross Site Allowance
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
server.use(CORS(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(express.static('../client/build/'));

server.use('/api/student', StudentRouter);
server.use('/api/auth/', AuthRouter);
server.use('/api/rocket', RocketRouter);
server.use('/api/user', UserRouter);
server.use('/api/responserocket', ResponseRocketRouter);
server.use('/api/question', QuestionRouter);
server.use('/api/cohort', CohortRouter);

//Stripe Stuff
server.post('/charge', async (req, res) => {
    console.log(req.body);
    try {
        let { status } = await stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'An example charge',
            source: req.body.token,
        });

        res.json({ status });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = server;
