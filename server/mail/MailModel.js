const cohortModel = require('../cohort/Cohort');
const generateQueryPopulator = query => field =>
    Array.isArray(field) ? query.populate(...field) : query.populate(field);

const getAll = (Model, ...populatedFields) => async () => {
    const query = Model.find();
    const handlePopulatingFields = generateQueryPopulator(query);

    populatedFields.forEach(handlePopulatingFields);
    return await query.exec();
};

const getAllCohorts = getAll(cohortModel);

module.exports = { getAllCohorts, getAll };
