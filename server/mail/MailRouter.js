const router = require('express').Router();
const { getAllCohorts } = require('./MailModel');

const whereCohortRocket = (interval, start, end) => ({
    rockets: {
        $elemMatch: {
            [interval]: {
                $gte: start,
                $lt: end,
            },
        },
    },
});

router.route('/').get(async (_, res) => {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(Date.now());
    tomorrow.setHours(23, 59, 59, 59);

    try {
        const data = await getAllCohorts(whereCohortRocket('tw', today, tomorrow));
        res.json(data);
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
