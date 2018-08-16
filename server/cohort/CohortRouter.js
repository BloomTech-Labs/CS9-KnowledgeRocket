const router = require('express').Router();
const Cohort = require('./Cohort');

router
    .route('/')
    .get(get)
    .post(post);

function get(req, res) {
    Cohort.find()
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const cohort = new Cohort(req.body);
    cohort
        .save()
        .then(stuff => {
            res.status(201).json(stuff);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error in POST' });
        });
}

module.exports = router;
