const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Cohort = require('../cohort/Cohort');
const Question = require('../question/Question');

const Rocket = mongoose.Schema({
    title: { type: String, required: true },
    twoDay: { type: ObjectId, ref: 'Question' },
    twoWeek: { type: ObjectId, ref: 'Question' },
    twoMonth: { type: ObjectId, ref: 'Question' },
});

// function remove(array, element) {
//     array.forEach((item, index) => {
//         if (String(item._id) === String(element)) {
//             array.splice(index, 1);
//         }
//     });
// }

function removeQuestions(next, model) {
    Question.findById(mongoose.Types.ObjectId(model.twoDay))
        .remove()
        .then(() => {
            Question.findById(mongoose.Types.ObjectId(model.twoWeek))
                .remove()
                .then(() => {
                    Question.findById(mongoose.Types.ObjectId(model.twoMonth))
                        .remove()
                        .then(() => {
                            next();
                        })
                        .catch(err => {
                            next(err);
                        });
                })
                .catch(err => {
                    next(err);
                });
        })
        .catch(err => {
            next(err);
        });
}

Rocket.pre('remove', function(next) {
    // Remove nested scheduled rockets inside cohorts.
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
        if (included.length > 0) {
            included.forEach(item => {
                Cohort.findByIdAndUpdate(item._id, item).then(updated => {
                    removeQuestions(next, this);
                });
            });
        } else {
            removeQuestions(next, this);
        }
    });
});

module.exports = mongoose.model('Rocket', Rocket);
