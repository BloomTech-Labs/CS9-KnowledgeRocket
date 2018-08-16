const router = require('express').Router();
const User = require('./User');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .put(put)
    .get(getid);

function get(req, res) {
    User.find()
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const user = new User(req.body);
    user.save()
        .then(stuff => {
            res.status(201).json(stuff);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error in POST' });
        });
}
function getid(req, res) {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on GETID' });
        });
}
function put(req, res) {
    const id = req.params.id;
    const { email, uid, token, rockets, cohorts, account } = req.body;
    if (!User.findById(id)) {
        res.status(404).json({ message: 'User not found' });
    }
    User.findByIdAndUpdate(id, req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on PUT' });
        });
}

module.exports = router;
