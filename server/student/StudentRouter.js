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
        .then(exp => {
            res.status(200).json(exp);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET for Student' });
        });
}

function post(req, res) {
    // const email = req.body.email;
    // let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (regVar.test(email)) {
    //     const student = new Student(req.body);
    //     student
    //         .save()
    //         .then(stuff => {
    //             res.status(201).json(stuff);
    //         })
    //         .catch(err => {
    //             res.status(500).json({ message: 'There was an error in POST for Student' });
    //         });
    // } else {
    //     res.json({ errorMessage: 'email pattern incorrect' });
    // }

    const { email } = req.body;

    // validate student email
    let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regVar.test(email)) {
        // email is valid
        const student = new Student(req.body.student); // instantiate a new student
        const { id } = req.body;

        student
            .save()
            .then(newStudent => {
                // find the user who is currently signed in
                User.findByOne({ _id: id })
                    .then(user => {
                        // find the user's cohorts using the unique teacher's id
                        const cohorts = user.cohorts;
                        let cohortID;
                        for (let cohort of cohorts) {
                            if ((cohort.teacher = id)) {
                                // find the cohort's students
                                cohortID = cohort._id;
                                break; // stop searching as soon as the matching cohort is found
                            }
                        }
                        // use the cohortID to add the new student to the cohort's students
                        cohort.students.push(newStudent._id);
                        // update the cohort with the new array of students
                        Cohort.findByIdAndUpdate(cohortID, { students: cohort.students })
                            .populate('students')
                            .then(() => {
                                User.findById({ _id: id }).then(user => {
                                    res.status(201).json(user);
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errorMessage: 'There was an error finding this cohort',
                                });
                            });
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({ errorMessage: 'There was an error finding this user.' });
                    });

                // return the new student after saving to the db
                res.status(201).json(newStudent);
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: 'There was an error in saving the student to the database',
                });
            });
    } else {
        // invalid email - do nothing else
        res.json({ errorMessage: 'The provided email is not valid.' });
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
