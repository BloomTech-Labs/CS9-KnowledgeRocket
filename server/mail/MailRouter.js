const router = require('express').Router();
const { getAllCohorts, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');

router.route('/').get(async (_, res) => {
    const { today, tomorrow } = getTodayAndTomorrow();

    try {
        const data = await getAllCohorts(whereCohortRocket('td', today, tomorrow));
        res.json(data);
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
