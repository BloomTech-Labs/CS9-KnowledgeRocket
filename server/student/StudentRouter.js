const router = require('express').Router();
const Student = require('./Student.js');

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
    Student.find()
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET for Student' });
        });
}

function post(req, res) {
    const email = req.body.email;
    let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regVar.test(email)) {
        const student = new Student(req.body);
        student
            .save()
            .then(stuff => {
                res.status(201).json(stuff);
            })
            .catch(err => {
                res.status(500).json({ message: 'There was an error in POST for Student' });
            });
    } else {
        res.json({ errorMessage: 'email pattern incorrect' });
    }
}
function getid(req, res) {
    const id = req.params.id;
    Student.findById(id)
        .then(student => {
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on GETID' });
        });
}
function put(req, res) {
    const id = req.params.id;
    const { email, firstName, lastName } = req.body;
    if (!Student.findById(id)) {
        res.status(404).json({ message: 'Student not found' });
    }
    Student.findByIdAndUpdate(id, req.body)
        .then(student => {
            res.status(201).json(student);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on PUT' });
        });
}
function deleteid(req, res) {
    const id = req.params.id;
    if (!Student.findById(id)) {
        res.status(404).json({ message: 'Student not found' });
    }
    Student.findByIdAndRemove(id)
        .then(student => {
            res.status(204).json(student);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
