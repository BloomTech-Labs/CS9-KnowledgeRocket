const router = require('express').Router();
const { getAllCohorts, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');

const intervalDictionary = ['twoDay', 'twoWeek', 'twoMonth'];
const d = ['td', 'tw', 'tm'];

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
        const emails = data.map((resolvedCohorts, i) =>
            resolvedCohorts.map(({ teacher: { email }, students, rockets, cc }) => {
                const studentsEmails = students.map(({ email, _id }) => ({ email, id: _id }));
                const selectedRockets = rockets
                    .filter(rocket => new Date(rocket[d[i]]).toUTCString() === today.toUTCString())
                    .map(({ rocketId, _id }) => ({
                        cohortId: _id,
                        _id: rocketId[intervalDictionary[i]]._id,
                        title: rocketId[intervalDictionary[i]].title,
                    }))
                    .map(({ _id, title, cohortId }) => ({ id: _id, title, cohortId }));

                return {
                    teacherEmail: email,
                    students: studentsEmails,
                    selectedRockets,
                    cc,
                };
            })
        );

        res.json({ emails });
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;
