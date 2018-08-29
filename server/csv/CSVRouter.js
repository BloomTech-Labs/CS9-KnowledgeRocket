const router = require('express').Router();
const Student = require('../student/Student');
const Cohort = require('../cohort/Cohort');
const User = require('../user/User');

router.route('/').post(post);

function post(req, res) {
	const { teacherID, cohortID, studentData } = req.body;
	console.log(`TEACHERID ${JSON.stringify(teacherID)}`);
	console.log(`COHORTID ${JSON.stringify(teacherID)}`);
	console.log(`STUDENTDATA ${JSON.stringify(studentData)}`);

	// find teacher by id
	User.findById(teacherID)
		.populate('cohorts')
		.populate({
			path: 'cohorts',
			populate: { path: 'students', model: 'Students' },
		})
		.then(user => {
			console.log(`SUCECSSFULLY FOUND A USER ${user}`);
			// find cohort by id
			Cohort.findById(cohortID)
				.populate('students')
				.then(cohort => {
					console.log(`SUCESSFULLY FOUND A COHORT ${cohort}`);
					// add new students to Cohort.students
					cohort.students = [...cohort.students, ...studentData];
					console.log(`ADDED STUDENTS ${cohort.students}`);

					// update user
					User.findByIdAndUpdate(teacherID, { cohorts: cohort.students })
						.then(udpated => {
							console.log(`UPDATED USER SUCCESSFULLY`);
						})
						.catch(ERR => {
							RES.STATUS(500).JSON({ errorMessage: err.message });
						});
				})
				.catch(err => {
					res.status(500).json({ errorMessage: err.message });
				});
		})
		.catch(err => {
			res.status(500).json({ errorMessage: err.message });
		});
}

module.exports = router;
