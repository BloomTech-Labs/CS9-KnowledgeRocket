require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const stripe = require('stripe')(`${process.env.Secret_Key}`);
// Import Models Here
const StudentRouter = require('./student/StudentRouter');
const AuthRouter = require('./auth/AuthRouter');
const UserRouter = require('./user/UserRouter');
const RocketRouter = require('./rocket/RocketRouter');
const ResponseRocketRouter = require('./responserocket/ResponseRocketRouter');
const QuestionRouter = require('./question/QuestionRouter');
const CohortRouter = require('./cohort/CohortRouter');

const server = express();

const authMiddleware = (req, res, next) => {
    // TODO: Implement Authentication and Authorization
    // const {token, uid} = req.headers;
    // Will require Front-End Caching of Data to save spot
    // So data is back if user's token expires while they are not done.
    next();
};

// Begin code for cross-site allowances -------------------------------------
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.static('../client/build/'));

// Back End Routes will User authMiddleware
server.use('/api/student', authMiddleware, StudentRouter);
server.use('/api/auth/', AuthRouter);
server.use('/api/rocket', authMiddleware, RocketRouter);
server.use('/api/user', authMiddleware, UserRouter);
server.use('/api/responserocket', authMiddleware, ResponseRocketRouter);
server.use('/api/question', authMiddleware, QuestionRouter);
server.use('/api/cohort', authMiddleware, CohortRouter);

//Stripe Stuff
server.post('/charge', async (req, res) => {
    try {
        let { status } = await stripe.charges.create({
            amount: 999,
            currency: 'usd',
            description: 'An example charge',
            source: req.body.token,
        });
        //In here modify users to switch between pro and free
        res.json({ status });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = server;
