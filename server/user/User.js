const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Rocket = require('../rocket/Rocket');
const Cohort = require('../cohort/Cohort');
const autopopulate = require('mongoose-autopopulate');

const User = mongoose.Schema({
    email: { type: String, required: true },
    ccEmail: { type: String, default: this.email},
    uid: { type: String },
    // token: { type: String },
    rockets: [{ type: ObjectId, ref: 'Rocket', autopopulate: true }],
    cohorts: [{ type: ObjectId, ref: 'Cohort', autopopulate: true }],
    account: {
        // Options 'free','monthly', 'yearly'
        type: String,
        enum: ['free', 'monthly', 'yearly'],
        default: 'free',
    },
    // When Subs End: Disable Pro Functionality
    // but Do not Delete Pro DB Entries.
    expiration: { type: Date },
    authProvider: {
        // authProvider: String 'Google'...
        type: String,
        enum: ['email', 'google', 'facebook', 'twitter'],
        default: 'email',
    },
});

User.plugin(autopopulate);

// TODO: Test it inside server by calling User.remove({_id: useridhere});
User.pre('remove', function(next) {
    // Remove Rockets: For all items in rockets array
    // Each item is a rocket's MongoDB _id
    // Find each by ID inside Rockets and Remove them
    this.rockets.forEach(rocketId => {
        Rocket.remove({ _id: rocketId }).exec();
    });
    // Remove Cohorts: For all items in Cohorts array
    // Each item is a cohort's MongoDB _id
    // Find each by ID inside Cohorts and Remove them
    this.cohorts.forEach(cohortId => {
        Cohort.remove({ _id: cohortId }).exec();
    });
    next();
});


module.exports = mongoose.model('User', User);
