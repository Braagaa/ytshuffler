const express = require('express');
const {hash, compare} = require('bcrypt');
const {nextError, duplicateError, errorIf} = require('../utils/errors');
const {generateJWT} = require('../utils/jwt');
const {requiredBodyProps, validatePassword} = require('../middle-ware/validateYoutube');

const {User} = require('../modals/');

const nodeEnv = process.env.NODE_ENV || 'dev';
const createToken = generateJWT({expiresIn: '5h'});

const router = express.Router();

const getProp = prop => obj => obj[prop];
const toObj = prop => value => ({[prop]: value});
const merge = obj1 => obj2 => ({...obj1, ...obj2});
const success = (status, res) => data => res
	.status(status)
	.json(data);
const toCookie = (name, options, res) => data => 
	res.cookie(name, data, options);
const end = (status, res) => () => res.status(status).end();
const userCreateToken = user => createToken({
	id: user.id,
	settings: user.settings
});

const errorIfNull = errorIf(data => data === null);
const errorIfWrongPassword = errorIf(([valid]) => !valid);

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
			.then(userCreateToken)
			.then(toCookie('JWT', {
				secure: nodeEnv === 'production',
				maxAge: 1000 * 60 * 60 * 5
			}, res))
			.then(end(201, res))
			.catch(duplicateError(`${email} is already registered.`, next))
			.catch(nextError(500, 'Registration cannot be completed.', next));
	}
);

router.post(
	'/login',
	requiredBodyProps(['password', 'email']),
	(req, res, next) => {
		const {password, email} = req.body;
		return User.findOne({email})
			.then(errorIfNull(401, 'Incorrect email or password.'))
			.then(user => Promise.all([compare(password, user.password), user]))
			.then(errorIfWrongPassword(401, 'Incorrect email or password.'))
			.then(getProp(1))
			.then(userCreateToken)
			.then(toCookie('JWT', {
				secure: nodeEnv === 'production',
				maxAge: 1000 * 60 * 60 * 5
			}, res))
			.then(end(200, res))
			.catch(next);
	}
);

module.exports = router;
