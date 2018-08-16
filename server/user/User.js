const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema({
    email: { type: String, required: true },
    uid: { type: String },
    token: { type: String },
    rockets: [{ type: ObjectId, ref: 'Rocket' }],
    cohorts: [{ type: ObjectId, ref: 'Cohort' }],
    account: { type: String, default: 'Free' }, // Options 'Free','Monthly', 'Yearly'
});

module.exports = mongoose.model('User', User);
