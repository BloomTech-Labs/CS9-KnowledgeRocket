const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ResponseRocket = mongoose.Schema({
    questionId: { type: ObjectId, ref: 'Question' },
    cohortId: { type: ObjectId, ref: 'Cohort' },
    // By Default: Null value for each student.
    // Update it to an object with choice and date once submitted.
    // if it is not null populate the updated field instead of the submitted field.
    // * students: { 'id':studentId, answer: [{ choice: 0, submitted: date, updated: Date }]},
    students: [
        {
            studentId: {
                type: ObjectId,
                ref: 'Student',
            },
            answer: [
                {
                    choice: {
                        // Choices are indices for the answers array.
                        type: Number,
                        default: 0,
                    },
                    submitted: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
    sent: { type: Number, default: 0 },
});
/* 
#Go inside cohort for that specific user, 
get the cohort id,
grab the list of students,
grab the list of rockets that are assigned,
#go inside the rocket db,
find all rockets that match rockets from the cohort,
grab all question ids,
#get all response rockets
compare the students id that match the student ids from the cohort,
grab all the responses,
send that data to the frontend{probably some state stuff}
*/
module.exports = mongoose.model('ResponseRocket', ResponseRocket);
