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

	// find cohort by id
	// add new students to Cohort.students

	// find teacher by id
	User.findById(teacherID)
		.then(found => {
			console.log(`SUCECSSFULLY FOUND A USER ${found}`);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: err.message });
		});
}

module.exports = router;
