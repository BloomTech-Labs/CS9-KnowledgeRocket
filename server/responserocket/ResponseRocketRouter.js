const router = require('express').Router();
const ResponseRocket = require('./ResponseRocket');

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
    ResponseRocket.find()
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const responseRocket = new ResponseRocket(req.body);
    responseRocket
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
    ResponseRocket.findById(id)
        .then(thing => {
            res.status(200).json(thing);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on GETID' });
        });
}
function put(req, res) {
    const id = req.params.id;
    const { questionId, students, sent } = req.body;
    if (!ResponseRocket.findById(id)) {
        res.status(404).json({ message: 'ResponseRocket not found' });
    }
    ResponseRocket.findByIdAndUpdate(id, req.body)
        .then(thing => {
            res.status(201).json(thing);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on PUT' });
        });
}
function deleteid(req, res) {
    const id = req.params.id;
    if (!ResponseRocket.findById(id)) {
        res.status(404).json({ message: 'ResponseRocket not found' });
    }
    ResponseRocket.findByIdAndRemove(id)
        .then(thing => {
            res.status(204).json(thing);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}
module.exports = router;
