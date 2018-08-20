const cohortModel = require('../cohort/Cohort');

const getAll = (Model, ...populatedFields) => async () =>
    await Model.find().populate(...populatedFields);

const getAllCohorts = getAll(cohortModel, 'students', 'rockets', 'teacher');

module.exports = { getAllCohorts };
