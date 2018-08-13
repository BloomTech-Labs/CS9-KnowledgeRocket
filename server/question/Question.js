const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Question = mongoose.Schema({
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    question: { type: String, required: true },
    choices: []
});

module.exports = mongoose.model('Question', Question);