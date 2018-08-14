require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
//               process.env if it exists OR local version for testing offline.
const mongoURL = process.env.Database_Url || 'mongodb://127.0.0.1/knowledgerocket';
// Import Models Here
const StudentRouter = require('./student/StudentRouter');
const AuthRouter = require('./auth/AuthRouter');
const UserRouter = require('./user/UserRouter');
const RocketRouter = require('./rocket/RocketRouter');
const ResponseRocketRouter = require('./responserocket/ResponseRocketRouter');
const QuestionRouter = require('./question/QuestionRouter');
const CohortRouter = require('./cohort/CohortRouter');

mongoose
  .connect(mongoURL, { useNewUrlParser: true })//Whatever mongo db database we use will go here
  .then(mongo => {
    console.log('mongo server working')
  })
  .catch(err => {
    console.log('error', err);
  });

const server = express();

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

// server.get('/', (req, res) => {
//   res.status(200).json({ api: 'running' });
// });

if(process.env.NODE_ENV !== 'test') {
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
}
module.exports = server