//@ts-check
const router = require('express').Router();
const Cohort = require('./Cohort');
const User = require('../user/User');

router
    .route('/')
    .get(get)
    .post(post);
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

function post(req, res) {
    const cohort = new Cohort(req.body.cohort);
    const id = req.body.id;

    cohort
        .save()
        .then(savedCohort => {
            User.findOne({ _id: id })
                .populate('cohorts')
                .populate('rockets')
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
