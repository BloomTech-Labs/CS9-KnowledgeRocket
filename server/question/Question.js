const mongoose = require('mongoose');

const Question = mongoose.Schema({
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    question: { type: String, required: true },
    //{ text: 'First Answer', correct: true/false}
    choices: [],
    correct: {type: String, required: true}
});

module.exports = mongoose.model('Question', Question);
