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
router.route('/update').post(updateRocket);
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
            } else {
                choice.correct = false;
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

    // const tdResult = Question.create(updateAndSaveFormattedQuestions(td))
    // const twResult = Question.create(updateAndSaveFormattedQuestions(tw))
    // const tmResult = Question.create(updateAndSaveFormattedQuestions(tm))

    // const promiseArray = [tdResult,twResult,tmResult];
    // Promise.all(promiseArray).then(response=>{
    //     console.log(response)
    // })

    let td_id, tw_id, tm_id;
    Question.create(updateAndSaveFormattedQuestions(td)).then(tdQuestion => {
        td_id = tdQuestion._id;
        Question.create(updateAndSaveFormattedQuestions(tw)).then(twQuestion => {
            tw_id = twQuestion._id;
            Question.create(updateAndSaveFormattedQuestions(tm)).then(tmQuestion => {
                tm_id = tmQuestion._id;
                // Format Rocket
                // console.log('ids', td_id, tw_id, tm_id)
                const rocketToSave = {
                    title: postRocket.title,
                    twoDay: td_id,
                    twoWeek: tw_id,
                    twoMonth: tm_id,
                };
                // console.log('rocket to save', rocketToSave)
                // Save Rocket to MongoDB
                Rocket.create(rocketToSave)
                    .then(createdRocket => {
                        // Add created rocket to the user's rocket array;
                        User.findOne({ uid })
                            .populate('cohorts')
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
                                        User.findById(foundUser._id)
                                            .populate('cohorts')
                                            .populate({
                                                path: 'rockets',
                                                populate: { path: 'twoDay' },
                                            })
                                            .populate({
                                                path: 'rockets',
                                                populate: { path: 'twoWeek' },
                                            })
                                            .populate({
                                                path: 'rockets',
                                                populate: { path: 'twoMonth' },
                                            })
                                            .then(modifiedUser => {
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

function updateRocket(req, res) {
    const { rocket, uid } = req.body;
    const postRocket = rocket;
    let { td, tw, tm } = rocket;

    // Update Correct Choices
    const updateAndSaveFormattedQuestions = question => {
        question.choices.forEach(choice => {
            if (choice.text === question.correct) {
                choice.correct = true;
            } else {
                choice.correct = false;
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
    Question.findByIdAndUpdate(td._id, updateAndSaveFormattedQuestions(td)).then(tdQuestion => {
        td_id = tdQuestion._id;
        Question.findByIdAndUpdate(tw._id, updateAndSaveFormattedQuestions(tw)).then(twQuestion => {
            tw_id = twQuestion._id;
            Question.findByIdAndUpdate(tm._id, updateAndSaveFormattedQuestions(tm)).then(
                tmQuestion => {
                    tm_id = tmQuestion._id;
                    // Format Rocket
                    // console.log('ids', td_id, tw_id, tm_id)
                    const rocketToSave = {
                        title: postRocket.title,
                        twoDay: td_id,
                        twoWeek: tw_id,
                        twoMonth: tm_id,
                    };
                    // console.log('rocket to save', rocketToSave)
                    // Save Rocket to MongoDB
                    Rocket.findByIdAndUpdate(rocket._id, rocketToSave)
                        .then(createdRocket => {
                            // Add created rocket to the user's rocket array;
                            User.findOne({ uid })
                                .populate('cohorts')
                                .populate({ path: 'rockets', populate: { path: 'twoDay' } })
                                .populate({ path: 'rockets', populate: { path: 'twoWeek' } })
                                .populate({ path: 'rockets', populate: { path: 'twoMonth' } })
                                .then(foundUser => {
                                    // append to foundUser's array of rockets...
                                    res.status(201).json(foundUser);
                                })
                                .catch(errUser => {
                                    res.status(404).json({ errorMessage: errUser.message });
                                });
                        })
                        .catch(createRocketError => {
                            res.status(500).json({ errorMessage: createRocketError.message });
                        });
                }
            );
        });
    });
}

function get(req, res) {
    Rocket.find()
        .populate('questions')
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
        .populate('twoDay')
        .populate('twoWeek')
        .populate('twoMonth')
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
