const cohortModel = require('../cohort/Cohort');
const generateQueryPopulator = query => field =>
    Array.isArray(field) ? query.populate(...field) : query.populate(field);

const getAll = (Model, ...populatedFields) => async (searchQuery = {}) => {
    const prepopulated = Model.find(searchQuery);
    const handlePopulatingFields = generateQueryPopulator(prepopulated);

    populatedFields.forEach(handlePopulatingFields);
    return await prepopulated.exec();
};

const getAllCohorts = getAll(cohortModel);

module.exports = { getAllCohorts, getAll };
