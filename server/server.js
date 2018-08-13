const express = require('express');
const helmet = require('helmet');


const StudentRouter = require('./student/StudentRouter');

const mongoose = require('mongoose');
mongoose 
  .connect('${process.env.Database_Url}', {useNewUrlParser: true})//Whatever mongo db database we use will go here
  .then(mongo => {
    console.log('mongo server working')
  })
  .catch(err => {
    console.log('error', err);
  });

const server = express();

server.use(helmet());
server.use(express.json());

server.user('/api/Student', StudentRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));