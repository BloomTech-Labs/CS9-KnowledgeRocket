const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Rocket = mongoose.Schema({
    title: {type: String, required: true},
    twoDay: {type: ObjectID, ref: 'Question'},
    twoWeek: {type: ObjectID, ref: 'Question'},
    twoMonth: {type: ObjectID, ref: 'Question'},
});

module.exports = mongoose.model('Rocket', Rocket);