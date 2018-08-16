const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Student = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = mongoose.model('Student', Student);
