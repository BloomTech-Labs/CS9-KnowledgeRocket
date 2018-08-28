const router = require('express').Router;
const Student = require('../student/Student');
const Cohort = require('../cohort/Cohort');
const User = require('../user/User');

router.route('/').post(post);

function post(req, res) {}
