const cohortModel = require('../cohort/Cohort');
const generateQueryPopulator = query => field =>
    Array.isArray(field) ? query.populate(...field) : query.populate(field);

const getAll = (Model, ...populatedFields) => async ({
    options,
    select = null,
    ...searchQuery
} = {}) => {
    const prepopulated = Model.find(searchQuery, select, options);
    const handlePopulatingFields = generateQueryPopulator(prepopulated);

    populatedFields.forEach(handlePopulatingFields);
    return await prepopulated.exec();
};

const getAllCohorts = getAll(cohortModel);

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
    const today = new Date(thisSecond);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(thisSecond);
    tomorrow.setHours(23, 59, 59, 59);
    return { today, tomorrow };
};

module.exports = { getAllCohorts, getAll, whereCohortRocket, getTodayAndTomorrow };
