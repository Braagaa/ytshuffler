const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {User} = require('../modals');
const {errorIfNull} = require('../utils/errors');
const {mapTo} = require('../utils/func');
const {toCookies} = require('../utils/jwt');

const secret = process.env.JWT_SECRET;
const unauthorizedMsg = 'Unauthorized user.';

const setUser = req => user => {
	req.user = user;
	return user;
};
const callNext = next => () => next();

const auth = (req, res, next) => {
	const {cookies} = req;
	if (!cookies['JWT-HP'] && !cookies['JWT-S'])
		return next(createError(401, unauthorizedMsg));

	const jwtEncoded = cookies['JWT-HP'] + '.' + cookies['JWT-S'];
	let token;
	try {
		token = jwt.verify(jwtEncoded, secret);
	} catch(error) {
		return next(createError(401, unauthorizedMsg));
	};

	return User.findById(token.useruuid, {email: 0, password: 0})
		.then(errorIfNull(404, 'User cannot be found.'))
		.then(setUser(req))
		.then(mapTo([cookies['JWT-HP'], cookies['JWT-S']]))
		.then(toCookies(res))
		.then(callNext(next))
		.catch(next);
};

module.exports = {auth};
