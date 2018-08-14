require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
//               process.env if it exists OR local version for testing offline.
const mongoURL = process.env.Database_Url || 'mongodb://127.0.0.1/knowledgerocket';
// Import Models Here
const StudentRouter = require('./student/StudentRouter');
const CohortRouter = require('./cohort/CohortRouter');
const AuthRouter = require('./auth/AuthRouter');

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

server.use('/api/student', StudentRouter);
server.use('/api/cohort', CohortRouter);
server.use('/api/auth/', AuthRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));