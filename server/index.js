require('dotenv').config();
const server = require('./server');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoURL = process.env.Database_Url || 'mongodb://127.0.0.1/knowledgerocket';
//process.env if it exists OR local version for testing offline.

mongoose
    .connect(
        mongoURL,
        { useNewUrlParser: true }
    ) //Whatever mongo db database we use will go here
    .then(mongo => {
        console.log('mongo server working');
    })
    .catch(err => {
        console.error('error', err);
    });

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
