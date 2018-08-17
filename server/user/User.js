const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema({
    email: { type: String, required: true },
    uid: { type: String },
    token: { type: String },
    rockets: [{ type: ObjectId, ref: 'Rocket' }],
    cohorts: [{ type: ObjectId, ref: 'Cohort' }],
    // When Subs End: Disable Pro Functionality, but Do not Delete Stuff yet.
    account: { type: String, default: 'Free' }, // Options 'Free','Monthly', 'Yearly'
    // authProvider: String 'Google'...
});

module.exports = mongoose.model('User', User);
