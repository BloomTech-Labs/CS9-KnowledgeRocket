const router = require('express').Router();
const { getAllCohorts, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');

const intervalDictionary = {
    td: 'twoDay',
    tw: 'twoWeek',
    tm: 'twoMonth',
};

router.route('/').get(async (_, res) => {
    const { today, tomorrow } = getTodayAndTomorrow();

    const whereCohortIntervalIs = interval => whereCohortRocket(interval, today, tomorrow);

    // The order of these promises is preserved once resolved
    // https://stackoverflow.com/a/28066851
    const unresolvedCohortData = [
        getAllCohorts(whereCohortIntervalIs('td')),
        getAllCohorts(whereCohortIntervalIs('tw')),
        getAllCohorts(whereCohortIntervalIs('tm')),
    ];

    try {
        const data = await Promise.all(unresolvedCohortData);
        // get all the emails
        const emails = data.map(resolvedCohorts =>
            resolvedCohorts.map(({ teacher, students: { email }, rockets }) => ({
                teacher,
                email,
                rockets,
            }))
        );
        res.json({ emails });
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
