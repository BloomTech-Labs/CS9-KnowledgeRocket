//@ts-check
const router = require('express').Router();
const Rocket = require('./Rocket');
const User = require('../user/User');

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
    // axios.post(`${url}/api/rocket/add`, {rocket, uid});
    // twoDay: { type: ObjectId, ref: 'Question' },
    // twoWeek: { type: ObjectId, ref: 'Question' },
    // twoMonth: { type: ObjectId, ref: 'Question' },
    // RocketSchema from Front End: title, td, tw, tm
        // THIS IS WHAT td, tm, tw look like
            // explanation: '',
            // question: '',
            // choices: [
            //     {
            //         text: 'Answer 1',
            //     },
            //     {
            //         text: 'Answer 2',
            //     },
            //     {
            //         text: 'Answer 3',
            //     },
            //     {
            //         text: 'Answer 4',
            //     },
            // ],
            // correct: '',       
    

    const { rocket, uid } = req.body;
    const { twoDay, twoWeek, twoMonth } = rocket;
    // Add questions to DB.. get returned _id fro each question
        // Create a Rocket with rocket info
            // Add to rocket the title
            // Add to rocket twoDay: the td:_id
            // Add to rocket twoDay: the td:_id
            // Add to rocket twoDay: the td:_id
    // Use returned _id to replace rocket.twoDay, rocket.twoWeek, rocket.twoMonth with those IDs
    // Afterwards create the rocket, but not before the promise fulfills.
    Rocket.create(rocket)
        .then(createdRocket => {
            // Add created rocket to the user's rocket array;
            User.findOne({ uid })
                .then(foundUser => {
                    // append to foundUser's array of rockets...
                    if (foundUser) {
                        let rocketArray = foundUser.rockets;
                        rocketArray.push(createdRocket._id);
                        // Update currently found user's rocket's array..
                        User.findByIdAndUpdate(foundUser._id, { rockets: rocketArray }).then(
                            modifiedUser => {
                                // Hopefully return the modified user with the new rocket's array to the front end.
                                modifiedUser.rockets.push(createdRocket._id);
                                res.status(201).json(modifiedUser);
                            }
                        );
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
