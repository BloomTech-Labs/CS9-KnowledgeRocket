const cohortModel = require('../cohort/Cohort');

const getAll = (Model, ...populatedFields) => async () => {
    const query = Model.find();
    populatedFields.forEach(field => {
        query.populate(field);
    });
    return await query.exec();
};

const getAllCohorts = getAll(cohortModel, 'students', 'rockets', 'teacher');

module.exports = { getAllCohorts };
