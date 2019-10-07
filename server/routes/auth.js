const express = require('express');
const {hash, compare} = require('bcrypt');
const {nextError, duplicateError} = require('../utils/errors');
const {requiredBodyProps, validatePassword} = require('../middle-ware/validateYoutube');

const {User} = require('../modals/');

const router = express.Router();

const toObj = prop => value => ({[prop]: value});
const merge = obj1 => obj2 => ({...obj1, ...obj2});
const success = (status, res) => data => res
	.status(status)
	.json(data);

router.post(
	'/register', 
	requiredBodyProps(['password', 'email']), 
	validatePassword,
	(req, res, next) => {
		const {password, email} = req.body;
		return hash(password, 10)
			.then(toObj('password'))
			.then(merge({email}))
			.then(data => User.create(data))
			.then(toObj('data'))
			.then(success(201, res))
			.catch(duplicateError(`${email} is already registered.`, next))
			.catch(nextError(500, 'Registration cannot be completed.', next));
	}
);

module.exports = router;
