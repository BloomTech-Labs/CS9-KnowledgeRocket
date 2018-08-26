const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Cohort = require('../cohort/Cohort.js');

const Rocket = mongoose.Schema({
    title: { type: String, required: true },
    twoDay: { type: ObjectId, ref: 'Question' },
    twoWeek: { type: ObjectId, ref: 'Question' },
    twoMonth: { type: ObjectId, ref: 'Question' },
});

function remove(array, element) {
    array.forEach((item, index) => {
        if (String(item._id) === String(element)) {
            array.splice(index, 1);
        }
    });
}

// Pre Remove schema to find nested Scheduled Rockets inside cohorts and remove them.
Rocket.pre('remove', function(next) {
    let included = [];
    Cohort.find().then(found => {
        found.forEach(rocket => {
            if (rocket.rockets.length > 0) {
                rocket.rockets.forEach((each, index) => {
                    if (String(each.rocketId) === String(this._id)) {
                        rocket.rockets.splice(index, 1);
                        included.push(rocket);
                    }
                });
            }
        });
        included.forEach(item => {
            Cohort.findByIdAndUpdate(item._id, item)
                .then(updated => {
                    next();
                })
                .catch(err => {
                    next(err);
                });
        });
        next();
    });
});

module.exports = mongoose.model('Rocket', Rocket);
