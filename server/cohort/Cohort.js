const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Cohort = mongoose.Schema({
    title: { type: String, required: true },
    teacher: { type: ObjectId, ref: 'User' },
    cc: { type: Boolean, default: false },
    students: [{ type: ObjectId, ref: 'Student' }],
    rockets: [
        {
            startDate: { type: Date },
            td: { type: Date },
            tm: { type: Date },
            tw: { type: Date },
            rocketId: { type: ObjectId, ref: 'Rocket' },
        },
    ],
});

//TODO: Pre Save Validator to Disable Duplicate Students per Cohort.

module.exports = mongoose.model('Cohort', Cohort);
