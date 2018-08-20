const Router = require('./MailRouter');
const Model = require('./MailModel');
const { generateEmail } = require('./generateEmail');

module.exports = { Router, Model, generateEmail };
