const router = require('express').Router();
const { getAllCohorts } = require('./MailModel');

router.route('/').get(async (req, res) => {
    try {
        const data = await getAllCohorts();
        res.json(data);
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
