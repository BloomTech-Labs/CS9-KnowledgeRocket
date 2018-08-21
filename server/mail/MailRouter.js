const router = require('express').Router();
const { getAllCohorts } = require('./MailModel');

router.route('/').get((req, res) => {
    getAllCohorts()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({
                err,
            });
        });
});

module.exports = router;
