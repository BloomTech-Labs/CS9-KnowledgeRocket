const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Email = mongoose.Schema({
    questionId: { type: ObjectId, ref: 'Question' },
    // By Default: Null value for each student.
    // Update it to an object with choice and date once submitted.
    // if it is not null populate the updated field instead of the submitted field.
    // * students: { 'StudentID': Null / { choice: 0, submitted: date, updated: Null }},
    students: {type: Object},
    sent: {type: Number, default: 0}
});

module.exports = mongoose.model('Email', Email);