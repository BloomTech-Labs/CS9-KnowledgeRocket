//@ts-check
const router = require('express').Router();
const Student = require('./Student.js');
const User = require('../user/User');
const Cohort = require('../cohort/Cohort');

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
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET for Student' });
        });
}

function post(req, res) {
    console.log(`REQ.BODY ${JSON.stringify(req.body)}`);
    const email = req.body.student.email;
    console.log(`EMAIL ${email}`);
    // validate student email
    let regVar = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (regVar.test(email)) {
        // email is valid
        const student = new Student(req.body.student); // instantiate a new student
        const { teacherID, cohortID } = req.body;

        console.log('EMAIL IS VALID');
        console.log(`STUDENT ${student}`);

        student
            .save()
            .then(newStudent => {
                console.log(`NEW STUDENT ${newStudent}`);
                // find the user who is currently signed in
                Cohort.findOne({ _id: cohortID })
                    .then(cohort => {
                        // add new student id to the cohort.students array
                        cohort.students.push(newStudent._id);
                        console.log(`new student ${newStudent}`);
                        // update cohort with new list of students
                        Cohort.findOneAndUpdate({ _id: cohortID })
                            // .populate('students')
                            .then(cohort => {
                                // find user and populate their data
                                console.log(`found ${found}`);
                                User.findOne({ _id: teacherID })
                                    .populate({
                                        path: 'cohorts',
                                        populate: { path: 'students' },
                                    })
                                    .populate('rockets')
                                    .then(user => {
                                        res.status(201).json(user);
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            errorMessage: 'There was an error finding the user',
                                        });
                                    });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errorMessage: 'There was an error updating the cohort',
                                });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({ errorMessage: 'There was an error saving the student' });
                    });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'There was an error saving the student' });
            });
    }
}

function getid(req, res) {
    const id = req.params.id;
    Student.findById(id)
        .then(expected => {
            res.status(200).json(expected);
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
        .then(expected => {
            res.status(201).json(expected);
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
        .then(expected => {
            console.log(`expected ${expected}`);
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
