const router = require('express').Router();
const ResponseRocket = require('./ResponseRocket');
const Rocket = require('../rocket/Rocket');

router
    .route('/')
    .get(get)
    .post(post);
router.route('/answer').post(postAnswer);
router.route('/participation/:cohortId').get(getParticipationPerCohort);
router.route('/results/').post(results);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);
// Get results for RocketResults
function results(req, res) {
    const { cohortId, rocketId } = req.body;

    // Find the rocket by Id and get all 3 question Ids from it.
    Rocket.findOne({ _id: rocketId })
        .then(foundRocket => {
            const twoDay = foundRocket.twoDay._id;
            const twoWeek = foundRocket.twoWeek._id;
            const twoMonth = foundRocket.twoMonth._id;

            // Find the Response Rockets for All Questions inside the FoundRocket
            const unresolvedArray = [
                ResponseRocket.find({ cohortId, questionId: twoDay }).exec(),
                ResponseRocket.find({ cohortId, questionId: twoWeek }).exec(),
                ResponseRocket.find({ cohortId, questionId: twoMonth }).exec(),
            ];

            Promise.all(unresolvedArray)
                .then(resolvedArray => {
                    const responseObject = {
                        twoDay: resolvedArray[0][0] ? resolvedArray[0][0] : {},
                        twoWeek: resolvedArray[1][0] ? resolvedArray[1][0] : {},
                        twoMonth: resolvedArray[2][0] ? resolvedArray[2][0] : {},
                    };
                    res.send(responseObject);
                })
                .catch(errorResolvingPromises => {
                    res.status(500).json({
                        errorMessage: errorResolvingPromises.message,
                        text: `Error Finding ResponseRockets for Question Id's: ${twoDay} ${twoWeek} ${twoMonth}`,
                    });
                });
        })
        .catch(errorFindingRocketsById => {
            res.status(500).json({
                errorMessage: errorFindingRocketsById.message,
                text: `Error finding Response Rocket using cohortId: ${cohortId} and questionId: ${questionId}`,
            });
        });
}

function getParticipationPerCohort(req, res) {
    const cohortId = req.params.cohortId;
    // Object Map with Property: QuestionId: | Value: Total Number of Students that Answered.
    const responsesPerQuestion = {};
    let totalResponses = 0;
    ResponseRocket.find({ cohortId })
        .then(responsesFound => {
            if (responsesFound.length > 0) {
                responsesFound.forEach(r => {
                    if (r.questionId) {
                        responsesPerQuestion[String(r.questionId)] = r.students.length;
                        totalResponses += r.students.length;
                    }
                });
            }
            res.status(200).send({ totalResponses, responsesPerQuestion });
            // TODO: Implement Question to Submit Rocket ID with it as well.
        })
        .catch(err => {
            res.status(500).json({ totalResponses });
        });
}

function postAnswer(req, res) {
    const { cohortId, studentId, questionId, answer } = req.body;
    const responseObject = {
        cohortId,
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
    ResponseRocket.find({ questionId, cohortId })
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
