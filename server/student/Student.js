const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Cohort = require('../cohort/Cohort');
const User = require('../user/User');

const Student = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
});

// called when a delete request is made for a student
// find students inside a cohort and remove them from the students field
Student.pre('remove', function(next) {
    Cohort.update(
        { students: this._id },
        { $pull: { students: this._id } },
        { multi: true }
    ).exec();
    next();
});

module.exports = mongoose.model('Student', Student);
