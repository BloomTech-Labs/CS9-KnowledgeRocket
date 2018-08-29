const router = require('express').Router();
const { getAllCohorts, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');

router.route('/').get(async (_, res) => {
    const { today, tomorrow } = getTodayAndTomorrow();

    const whereCohortIntervalIs = interval => whereCohortRocket(interval, today, tomorrow);

    const unresolvedCohortData = [
        getAllCohorts(whereCohortIntervalIs('td')),
        getAllCohorts(whereCohortIntervalIs('tw')),
        getAllCohorts(whereCohortIntervalIs('tm')),
    ];

    try {
        const data = await Promise.all(unresolvedCohortData);
        res.json(data);
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
