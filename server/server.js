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
const { Router: MailRouter } = require('./mail');
const User = require('./user/User');

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

// handle emails
server.use('/api/mail', authMiddleware, MailRouter);

//Stripe Stuff
server.post('/charge/:type', async (req, res) => {
    const { type } = req.params;
    const cost = type === 'monthly' ? 999 : 2999;
    try {
        let { status } = await stripe.charges.create({
            amount: cost,
            currency: 'usd',
            description: `Subscription Charge for: ${type}`,
            source: req.body.token,
        });
        //In here modify users to switch between pro and free
        if (status) {
            User.findById(req.body.id).then(currentUser => {
                let expirationDate = Date.parse(currentUser.expiration);
                let year =
                    expirationDate > Date.now()
                        ? expirationDate + 365 * 24 * 60 * 60 * 1000
                        : Date.now() + 365 * 24 * 60 * 60 * 1000;
                let month =
                    expirationDate > Date.now()
                        ? expirationDate + 30 * 24 * 60 * 60 * 1000
                        : Date.now() + 30 * 24 * 60 * 60 * 1000;
                console.log(year, month);
                const newExpiration = type === 'monthly'? month: year;
                User.findByIdAndUpdate(req.body.id, {
                    account: type,
                    expiration: newExpiration,
                })
                    .then(found => {
                        console.log(found);
                        res.status(201).json({ status });
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            });
        } else {
            res.status(500).json({ status });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = server;
