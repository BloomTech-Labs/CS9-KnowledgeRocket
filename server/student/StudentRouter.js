//@ts-check
const router = require('express').Router();
const Student = require('./Student.js');
const User = require('../user/User');
const Cohort = require('../cohort/Cohort');
const Papa = require('papaparse');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);
router.route('/importcsv').post(postCSV);
router.route('/exportcsv/:id').get(getCSV);

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
    const email = req.body.student.email;
    // validate student email
    const regVar = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (regVar.test(email)) {
        // email is valid
        const student = new Student(req.body.student); // instantiate a new student
        const { teacherID, cohortID } = req.body;
        student
            .save()
            .then(newStudent => {
                // find the user who is currently signed in
                Cohort.findOne({ _id: cohortID })
                    .then(cohort => {
                        // add new student id to the cohort.students array
                        cohort.students.push(newStudent._id);
                        // update cohort with new list of students
                        Cohort.findByIdAndUpdate(cohortID, cohort)
                            // .populate('students')
                            .then(() => {
                                // find user and populate their data
                                User.findById(teacherID)
                                    .then(teacher => {
                                        res.status(201).json(teacher);
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            errorMessage: err.message,
                                        });
                                    });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errorMessage: err.message,
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            errorMessage: 'There was an error saving the student',
                        });
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
    Student.findById(id)
        .then(deleted => {
            deleted.remove(); // calls the remove pre hook for Student schema
            res.send(deleted); // return a deleted user to update reducer
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

function postCSV(req, res) {
    const { teacherID, cohortID, studentData } = req.body;

    const regVar = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    let count = 0;
    // validate students
    studentData.forEach((student, index) => {
        // Conditional Statement to Carch Trailing empty lines in
        // Excel saved CSV files
        if (student.lastName === '') {
            studentData.splice(index, 1);
        }
        if (
            student.lastName.length > 0 &&
            student.firstName.length > 0 &&
            student.email.length > 0 &&
            regVar.test(student.email)
        ) {
        } else {
            console.error("ONE OR MORE STUDENTS DON'T HAVE THE CORRECT DATA");
        }
    });

    // save all students
    // find the user who is currently signed in
    // add new students to the user's cohort.students
    // update cohort
    // find user and populate data fields

    Student.insertMany(studentData)
        .then(newStudents => {
            Cohort.findOne({ _id: cohortID })
                .then(found => {
                    newStudents.forEach(student => {
                        found.students.push(student._id);
                    });
                    Cohort.findByIdAndUpdate(cohortID, found)
                        .then(() => {
                            User.findById(teacherID)
                                .then(teacher => {
                                    res.status(201).json(teacher);
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        errorMessage: err.message,
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
                    res.status(500).json({ errorMessage: 'There was an error finding the cohort' });
                });
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error saving the students' });
        });
}

function getCSV(req, res) {
    const cohortID = req.params.id;
    // find a cohort by id
    // find a cohort's list of students
    // unparse list of students
    // convert student data from JSON to csv format

    Cohort.findById({ _id: cohortID })
        .then(found => {
            const students = found.students;
            const packed = [];
            // extract student data
            students.forEach(student => {
                let data = [student.lastName, student.firstName, student.email];
                packed.push(data);
            });
            // describe how to create csv file
            const config = {
                quotes: false,
                quoteChar: '"',
                escapeChar: '"',
                delimiter: ',',
                header: true,
                newline: '\r\n',
            };
            // unparse JSON data to csv with specific fields
            let result = Papa.unparse(
                { fields: ['lastName', 'firstName', 'email'], data: packed },
                config
            );
            // send csv data to client
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error finding the cohort' });
        });
}

module.exports = router;
