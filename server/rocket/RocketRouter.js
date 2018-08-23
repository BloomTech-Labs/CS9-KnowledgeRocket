//@ts-check
const router = require('express').Router();
const Rocket = require('./Rocket');
const User = require('../user/User');
const Question = require('../question/Question');

router
    .route('/')
    .get(get)
    .post(post);
router.route('/add').post(postRocket);
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

function postRocket(req, res) {
    // console.log(req.body);

    const { rocket, uid } = req.body;
    const postRocket = rocket;
    let { td, tw, tm } = rocket;

    // Update Correct Choices
    const updateAndSaveFormattedQuestions = question => {
        question.choices.forEach(choice => {
            if (choice.text === question.correct) {
                choice.correct = true;
                return;
            }
        });
        // checking correct console.log(question.choices)
        return {
            title: postRocket.title,
            explanation: question.explanation,
            question: question.question,
            choices: question.choices,
            correct: question.correct,
        };
    };
    let td_id, tw_id, tm_id;
    Question.create(updateAndSaveFormattedQuestions(td)).then(tdQuestion => {
        tdQuestion._id = td_id;
        Question.create(updateAndSaveFormattedQuestions(tw)).then(twQuestion => {
            twQuestion._id = tw_id;
            Question.create(updateAndSaveFormattedQuestions(tm)).then(tmQuestion => {
                tmQuestion._id = tm_id;
                // Format Rocket
                const rocketToSave = {
                    title: postRocket.title,
                    twoDay: td_id,
                    twoWeek: tw_id,
                    twoMonth: tm_id,
                };
                // Save Rocket to MongoDB
                Rocket.create(rocketToSave)
                    .then(createdRocket => {
                        // Add created rocket to the user's rocket array;
                        User.findOne({ uid })
                            .populate('rockets')
                            .then(foundUser => {
                                // append to foundUser's array of rockets...
                                if (foundUser) {
                                    // console.log(foundUser)
                                    let rocketArray = foundUser.rockets;
                                    rocketArray.push(createdRocket._id);
                                    // Update currently found user's rocket's array..
                                    User.findByIdAndUpdate(foundUser._id, {
                                        rockets: rocketArray,
                                    }).then(afterUpdate => {
                                        User.findById(foundUser._id).populate('rockets').populate('cohorts').then(modifiedUser => {
                                            // Hopefully return the modified user with the new rocket's array to the front end.
                                            // console.log(JSON.stringify(modifiedUser))
                                            res.status(201).json(modifiedUser);
                                        });
                                    });
                                } else {
                                    res.status(404).json({ error: 'User not Found with that UID' });
                                }
                            })
                            .catch(errUser => {
                                res.status(404).json({ errorMessage: errUser.message });
                            });
                    })
                    .catch(createRocketError => {
                        res.status(500).json({ errorMessage: createRocketError.message });
                    });
            });
        });
    });
}

function get(req, res) {
    Rocket.find()
        .then(expected => {
            res.status(200).json(expected);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error in GET' });
        });
}

function post(req, res) {
    const rocket = new Rocket(req.body);
    rocket
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
    Rocket.findById(id)
        .then(expected => {
            res.status(200).json(expected);
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
        .then(expected => {
            res.status(201).json(expected);
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
        .then(expected => {
            res.status(204).json(expected);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error on DEL' });
        });
}

module.exports = router;
