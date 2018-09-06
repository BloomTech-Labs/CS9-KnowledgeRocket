const router = require('express').Router();
const { getAllCohorts, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');
const sgMail = require('@sendgrid/mail');

const { BASE_URL, SG_TEMPLATE_ID, SG_API_KEY } = process.env;
sgMail.setApiKey(SG_API_KEY);

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

        // generate api request

        const createPersonalization = (studentId, questionId, email, cohortId) => ({
            to: [{ email }],
            dynamic_template_data: {
                url: `${BASE_URL}/question/${cohortId}/${questionId}/${studentId}`,
            },
        });

        const createEmail = (personalizations, subject) => ({
            personalizations,
            template_id: SG_TEMPLATE_ID,
            from: { email: 'noreply@krocket.com' },
            subject: `Knowledge Rocket: ${subject}`,
        });

        // DANGER
        // INEFFECIENT
        const [twoDayEmails, twoWeekEmails, twoMonthEmails] = emails.map(email =>
            email.map(handleEmailCreation(createPersonalization, createEmail))
        );

        const emailBatch = [
            sgMail.send(twoDayEmails),
            sgMail.send(twoWeekEmails),
            sgMail.send(twoMonthEmails),
        ];

        try {
            await Promise.all(emailBatch);
            res.json({
                success: true,
            });
        } catch (error) {
            res.json({
                error,
                success: false,
            });
        }
    } catch (err) {
        res.json({
            err,
        });
    }
});

module.exports = router;

function handleEmailCreation(createPersonalization, createEmail) {
    return cohort => {
        const selectedRocket = cohort.selectedRockets[0];
        const personalizations = cohort.students.map(student =>
            createPersonalization(
                student.id,
                selectedRocket.id,
                student.email,
                selectedRocket.cohortId
            )
        );
        return createEmail(personalizations, selectedRocket.title);
    };
}
