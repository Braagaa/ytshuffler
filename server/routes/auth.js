const express = require('express');
const {hash, compare} = require('bcrypt');
const {nextError, duplicateError, errorIf, errorIfNull} = require('../utils/errors');
const {generateJWT, splitJWTEncoded, toCookies} = require('../utils/jwt');
const {generateCSRF, toCSRFHeader} = require('../utils/csrf');
const {requiredBodyProps, validatePassword} = require('../middle-ware/validateYoutube');
const {tap} = require('../utils/func');

const {User} = require('../modals/User');

const createToken = generateJWT({expiresIn: '1d'});

const router = express.Router();

const getProp = prop => obj => obj[prop];
const toObj = prop => value => ({[prop]: value});
const merge = obj1 => obj2 => ({...obj1, ...obj2});
const success = (status, res) => data => res
	.status(status)
	.json(data);
const end = (status, res) => () => res.status(status).end();

const userCSRFHeader = res => ({csrf}) => toCSRFHeader(res)(csrf);
const userTokenData = user => ({
	useruuid: user.id,
	csrf: generateCSRF(),
	audience: 'user'
});

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
			.then(userTokenData)
			.then(tap(userCSRFHeader(res)))
			.then(createToken)
			.then(splitJWTEncoded)
			.then(toCookies(res))
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
			.then(userTokenData)
			.then(tap(userCSRFHeader(res)))
			.then(createToken)
			.then(splitJWTEncoded)
			.then(toCookies(res))
			.then(end(200, res))
			.catch(next);
	}
);

module.exports = router;
