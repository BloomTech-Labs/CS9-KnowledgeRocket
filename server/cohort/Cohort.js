const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Cohort = mongoose.Schema({
    title: { type: String, required: true },
    teacher: { type: ObjectId, ref: 'User'},
    cc: { type: Boolean, default: false },
    students: [{ type: ObjectId, ref: 'Student', autopopulate: true }],
    rockets: [
        {
            startDate: { type: Date },
            td: { type: Date },
            tm: { type: Date },
            tw: { type: Date },
            rocketId: { type: ObjectId, ref: 'Rocket', autopopulate: true },
        },
    ],
});

Cohort.plugin(autopopulate);

//TODO: Pre Save Validator to Disable Duplicate Students per Cohort.

module.exports = mongoose.model('Cohort', Cohort);
