const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {User} = require('../modals/User');
const {errorIfNull} = require('../utils/errors');
const {toCookies} = require('../utils/jwt');

const secret = process.env.JWT_SECRET;
const unauthorizedError = createError(401, 'Unauthorized user.');

const setUser = req => user => {
	req.user = user;
	return user;
};
const callNext = next => () => next();

const auth = (req, res, next) => {
	const {cookies} = req;
	if (!cookies['JWT-HP'] && !cookies['JWT-S'])
		return next(unauthorizedError);

	const jwtEncoded = cookies['JWT-HP'] + '.' + cookies['JWT-S'];
	let token;

	try {
		token = jwt.verify(jwtEncoded, secret);
	} catch(error) {
		console.log(error);
		return next(unauthorizedError);
	};

	if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
		if (!req.get('CSRF') || req.get('CSRF') !== token.csrf) {
			return next(unauthorizedError);
		}
	}

	req.user = {
		id: token.useruuid, 
		_id: token.useruuid,
		settings: token.settings
	};

	toCookies(res)([cookies['JWT-HP'], cookies['JWT-S']]);

	return next();
};

module.exports = {auth};
