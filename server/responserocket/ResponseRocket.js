const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseRocket = mongoose.Schema({
    questionId: { type: ObjectId, ref: 'Question' },
    // By Default: Null value for each student.
    // Update it to an object with choice and date once submitted.
    // if it is not null populate the updated field instead of the submitted field.
    // * students: { 'id':studentId, answer: [{ choice: 0, submitted: date, updated: Date }]},
    students: [{
        studentId: {
            type: ObjectId, ref: 'Student',
        },
        answer: [
            {
                choice: {
                    // Choices are indices for the answers array.
                    type: Number, default: 0,
                },
                submitted: {
                    type: Date, default: Date.now,
                },
            }
        ],
    }],
    sent: { type: Number, default: 0 },
});

module.exports = mongoose.model('ResponseRocket', ResponseRocket);
