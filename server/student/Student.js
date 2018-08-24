const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Student = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
});

// Student.pre('remove', function(next) {
// 	// Remove all the assignment docs that reference the removed person.
// 	this.model('Cohort').remove({ students: this._id }, next);
// });

// Student.pre('update', function(next) {
// 	this.model('User').update({}, { $pull: { students: this._id } }, { multi: true }, next);
// });

module.exports = mongoose.model('Students', Student);
