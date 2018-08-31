const cohortModel = require('../cohort/Cohort');
const subHours = require('date-fns/sub_hours');
const timeOffset = require('../timeOffset.js');

const generateQueryPopulator = query => field =>
    Array.isArray(field) ? query.populate(...field) : query.populate(field);

const getAll = (Model, ...populatedFields) => async ({
    options,
    select = null,
    ...searchQuery
} = {}) => {
    const prepopulated = Model.find(searchQuery, select, options)
    const handlePopulatingFields = generateQueryPopulator(prepopulated);

    populatedFields.forEach(handlePopulatingFields);
    return await prepopulated.exec();
};

const getAllCohorts = getAll(cohortModel, 'teacher');

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

const getTodayAndTomorrow = () => {
    const thisSecond = Date.now();

    // The server and database are set to UTC time.
    // Therefore we need to offset the time to PST Time
    // Depending on daylight savings, this number can be 7 or 8
    const UTCToPSTHourOffset = timeOffset.UTCToPSTHourOffset;

    const today = subHours(new Date(thisSecond), UTCToPSTHourOffset);

    today.setHours(0, 0, 0, 0);
    const tomorrow = subHours(new Date(thisSecond), UTCToPSTHourOffset);
    tomorrow.setHours(23, 59, 59, 59);
    return { today, tomorrow };
};

module.exports = { getAllCohorts, getAll, whereCohortRocket, getTodayAndTomorrow };
