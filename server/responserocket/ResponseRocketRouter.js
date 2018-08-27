const router = require('express').Router();
const ResponseRocket = require('./ResponseRocket');

router
    .route('/')
    .get(get)
    .post(post);
router
    .route('/answer')
    .post(postAnswer)
router
    .route('/:id')
    .put(put)
    .get(getid)
    .delete(deleteid);

function postAnswer(req,res) {
    /*
    {
        studentId: 'ID STRING FOR MONGO STUDENT ID',
        questionId: 'FOR THE QUESTION THAT GOT ANSWERED',
        choiceIndex: Number of the index in the array of choices that the user picked.
        // * students: { 'id':studentId, answer: Null / { choice: 0, submitted: date, updated: Null }},
    }
    */
    // Find a responseRocket
        // If exists: Update it
        // if does not exist: Save it.
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
