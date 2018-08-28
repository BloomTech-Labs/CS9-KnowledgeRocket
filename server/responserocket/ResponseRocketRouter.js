const router = require('express').Router();
const ResponseRocket = require('./ResponseRocket');

router
    .route('/')
    .get(get)
    .post(post);
router.route('/answer').post(postAnswer);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

function postAnswer(req, res) {    
    const { studentId, questionId, answer } = req.body;
    const responseObject = {
        questionId,
        students: [
            {
                studentId,
                answer: [
                    {
                        choice: answer,
                        submitted: Date.now(),
                    },
                ],
            },
        ],
    };

    // Find a responseRocket
    // If exists: Update it
    // if does not exist: Save it.
    ResponseRocket.find({ questionId })
        .then(found => {
            if (found.length > 0) {
                // If found one with the questionId provided, append to it.
                // add student to found
                let studentIncluded = false;
                found[0].students.forEach((item, index) => {
                    // if the student already answered once.
                    if (String(item.studentId) === String(studentId)) {
                        item.answer.push({
                            choice: answer,
                            submitted: Date.now(),
                        });
                        studentIncluded = true;
                    }
                });
                // if the student had not answered before.
                // push a new student object to the students array.
                if (!studentIncluded) {
                    found[0].students.push({
                        studentId,
                        answer: {
                            choice: answer,
                            submitted: Date.now(),
                        },
                    });
                }
                found[0]
                    .update(found[0])
                    .then(updatedRR => {
                        res.status(201).json(updatedRR);
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: err.message });
                    });
            } else {
                ResponseRocket.create(responseObject)
                    .then(createdRR => {
                        res.status(201).json(createdRR);
                    })
                    .catch(err => {
                        res.status(500).json({ errorMessage: err.message });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err.message });
        });
}

function get(req, res) {
    ResponseRocket.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const responseRocket = new ResponseRocket(req.body);
    responseRocket
        .save()
        .then(expected => {
            res.status(201).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error in POST' });
        });
}
function getid(req, res) {
    const id = req.params.id;
    ResponseRocket.findById(id)
        .then(expected => {
            res.status(200).json(expected);
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
        .then(expected => {
            res.status(201).json(expected);
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
        .then(expected => {
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
