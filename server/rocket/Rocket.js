const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Rocket = mongoose.Schema({
    title: { type: String, required: true },
    twoDay: { type: ObjectId, ref: 'Question' },
    twoWeek: { type: ObjectId, ref: 'Question' },
    twoMonth: { type: ObjectId, ref: 'Question' },
});

module.exports = mongoose.model('Rocket', Rocket);
