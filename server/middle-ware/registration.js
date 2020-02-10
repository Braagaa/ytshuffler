const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {User} = require('../modals/User');
const {sendRegistrationEmail} = require('../utils/mailer');
const {generateEmailJWT, emailJWT} = require('../utils/jwt');

const emailSecret = process.env.EMAIL_SECRET;

const end = (status, res) => () => res.status(status).end();
const callNext = next => () => next();
const setReq = (prop, req) => value => {
	req[prop] = value;
	return value;
};

const resendRegistration = async (req, res, next) => {
	const {body: {email}} = req;
	const user = await User.findOne({email});

	//user does not exist in database continue registration
	if (!user) return next();
	
	if (user.active) 
		return next(createError(422, `${email} is already registered.`));

	return Promise.resolve(user)
		.then(emailJWT(email, generateEmailJWT({expiresIn: '1d'})))
		.then(sendRegistrationEmail(req, email))
		.then(end(201, res));
};

const confirmRegistration = (req, res, next) => {
	const {params: {jwt: token}} = req;
	try {
		const wow = jwt.verify(token, emailSecret);
		return User.findByIdAndUpdate(wow.useruuid, {active: true}, {new: true})
			.then(setReq('user', req))
			.then(callNext(next))
			.catch(next);
	} catch (error) {
		console.error(error);
		next(createError(401, 'Could not register user.'));
	};
};

module.exports = {resendRegistration, confirmRegistration};
