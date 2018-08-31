const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Cohort = require('../cohort/Cohort');
const Question = require('../question/Question');

const Rocket = mongoose.Schema({
    title: { type: String, required: true },
    twoDay: { type: ObjectId, ref: 'Question', autopopulate: true },
    twoWeek: { type: ObjectId, ref: 'Question', autopopulate: true },
    twoMonth: { type: ObjectId, ref: 'Question', autopopulate: true },
});

Rocket.plugin(autopopulate);

function removeQuestions(next, model) {
    Question.findById(mongoose.Types.ObjectId(model.twoDay._id))
        .remove()
        .then(() => {
            Question.findById(mongoose.Types.ObjectId(model.twoWeek._id))
                .remove()
                .then(() => {
                    Question.findById(mongoose.Types.ObjectId(model.twoMonth._id))
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
                    if (String(each.rocketId._id) === String(this._id)) {
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
                }).catch(next)
            });
        } else {
            removeQuestions(next, this);
        }
    }).catch(next)
});

module.exports = mongoose.model('Rocket', Rocket);
