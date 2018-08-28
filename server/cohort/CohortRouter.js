//@ts-check
const router = require('express').Router();
const Cohort = require('./Cohort');
const User = require('../user/User');

router
    .route('/')
    .get(get)
    .post(post);
router.route('/appendrocket').post(appendRocket);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

function get(req, res) {
    Cohort.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

// startDate: { type: Date },
//             td: { type: Date },
//             tm: { type: Date },
//             tw: { type: Date },
function appendRocket(req, res) {
    //rocketID, startDate, userID, cohortID
    const { rocketID, startDate, userID, cohortID } = req.body;
    console.log(rocketID, startDate, userID, cohortID);
    const parsedStartDate = Number(startDate);
    console.log('MyStartDateParsed', parsedStartDate);
    // Had to add 10 MS to the dates for actual moment to interpret past midnight
    const rocketObject = {
        rocketId: rocketID,
        startDate: parsedStartDate,
        td: parsedStartDate + 48 * 60 * 60 * 1000,
        tw: parsedStartDate + 14 * 24 * 60 * 60 * 1000,
        tm: parsedStartDate + 60 * 24 * 60 * 60 * 1000,
    };
    Cohort.findById(cohortID)
        .populate('rockets')
        .then(foundCohort => {
            // console.log('foundcohort before', foundCohort);
            // Find inside rockets array if a rocket matching rocketID exists
            // If exists: modify it with new schedule, etc.
            // else: push a new rocket to the array.
            let included = false;
            foundCohort.rockets.forEach((rocket, i) => {
                if (String(rocket.rocketId) === rocketID) {
                    foundCohort.rockets[i] = rocketObject;
                    included = true;
                }
            });
            if (!included) {
                foundCohort.rockets.push(rocketObject);
            }

            // console.log('foundcohort after', foundCohort);
            Cohort.findByIdAndUpdate(cohortID, foundCohort)
                .then(() => {
                    User.findById(userID)
                        .populate('cohorts')
                        .populate({
                            path: 'cohorts',
                            populate: { path: 'students', model: 'Students' },
                        })
                        .populate({ path: 'rockets', populate: { path: 'twoDay' } })
                        .populate({ path: 'rockets', populate: { path: 'twoWeek' } })
                        .populate({ path: 'rockets', populate: { path: 'twoMonth' } })
                        .then(populatedUser => {
                            res.status(201).json(populatedUser);
                        })
                        .catch(failureToPopulateUser => {
                            res.status(500).json({
                                failureToPopulateUser: failureToPopulateUser.message,
                            });
                        });
                })
                .catch(errorAdding => {
                    res.status(500).json({ errorAdding: errorAdding.message });
                });
        })
        .catch(errFinding => {
            res.status(500).json({ errorFinding: errFinding.message });
        });
}

function post(req, res) {
    const cohort = new Cohort(req.body.cohort);
    const id = req.body.id;

    cohort
        .save()
        .then(savedCohort => {
            User.findOne({ _id: id })
                .populate('cohorts')
                .populate({
                    path: 'cohorts',
                    populate: { path: 'students', model: 'Students' },
                })
                .populate('rockets')
                .populate('questions')
                .populate('rockets.questions.twoDay')
                .populate('rockets.questions.twoWeek')
                .populate('rockets.questions.twoMonth')
                .then(found => {
                    found.cohorts.push(savedCohort._id);
                    User.findByIdAndUpdate(id, { cohorts: found.cohorts })
                        .then(() => {
                            User.findOne({ _id: id })
                                .populate('cohorts')
                                .populate('rockets')
                                .then(user => {
                                    res.status(201).json(user); // sends user w/ populated cohorts
                                })
                                .catch();
                        })
                        .catch(err => {
                            res.status(500).json({ errorMessage: err.message });
                        });
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error in POST' });
        });
}
function getid(req, res) {
    const id = req.params.id;

    Cohort.findById(id)
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on GETID' });
        });
}
function put(req, res) {
    const id = req.params.id;
    const { title, teacher, cc, students, rockets } = req.body;
    if (!Cohort.findById(id)) {
        res.status(404).json({ message: 'Cohort not found' });
    }
    Cohort.findByIdAndUpdate(id, req.body)
        .then(expected => {
            res.status(201).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on PUT' });
        });
}
function deleteid(req, res) {
    const id = req.params.id;
    if (!Cohort.findById(id)) {
        res.status(404).json({ message: 'Cohort not found' });
    }
    Cohort.findByIdAndRemove(id)
        .then(expected => {
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
