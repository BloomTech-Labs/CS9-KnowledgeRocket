const router = require('express').Router();
const Rocket = require('./Rocket');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/add')
    .post(postRocket);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

function postRocket(req, res) {
    Rocket.create(req.body)
        .then(createdRocket => {
            res.status(201).json(createdRocket);
        }).catch(createRocketError => {
            res.status(500).json({ errorMessage: createRocketError.message })
        })
}

function get(req, res) {
    Rocket.find()
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const rocket = new Rocket(req.body);
    rocket
        .save()
        .then(stuff => {
            res.status(201).json(stuff);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error in POST' });
        });
}
function getid(req, res) {
    const id = req.params.id;
    Rocket.findById(id)
        .then(rocket => {
            res.status(200).json(rocket);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on GETID' });
        });
}
function put(req, res) {
    const id = req.params.id;
    const { title, twoDay, twoWeek, twoMonth } = req.body;
    if (!Rocket.findById(id)) {
        res.status(404).json({ message: 'Rocket not found' });
    }
    Rocket.findByIdAndUpdate(id, req.body)
        .then(rocket => {
            res.status(201).json(rocket);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on PUT' });
        });
}
function deleteid(req, res) {
    const id = req.params.id;
    if (!Rocket.findById(id)) {
        res.status(404).json({ message: 'Rocket not found' });
    }
    Rocket.findByIdAndRemove(id)
        .then(rocket => {
            res.status(204).json(rocket);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
