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

// Begin code for cross-site allowances -------------------------------------
server.use(cors());
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
