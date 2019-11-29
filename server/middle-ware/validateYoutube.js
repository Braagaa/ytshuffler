const app = require('../app');
const createError = require('http-errors');
const isNumber = require('is-number');
const sanitize = require('mongo-sanitize');
const mongoose = require('mongoose');

const {capitalize} = require('../utils/capitalize');
const {nextError} = require('../utils/errors');
const checkPassword = require('../utils/password');
const {Channel} = require('../modals/');

const parse = type => (req, res, next) => {
	if (req.body.kind === 'youtube#' + type) {
		req[type] = req.body;
		return next();
	}
	return next(createError(422, `Youtube ${capitalize(type)} not in body.`));
};

const parseChannel = parse('channel');
const parseSong = parse('song');

const required = type => prop => (req, res, next) => {
	if (!req[type][prop])
		next(createError(422, `Required paramter: '${prop}'`));
	next();
};

const requiredQuery = required('query');
const requiredBody = required('body');

const requiredMany = type => props => (req, res, next) => {
	const neededProps = props
		.filter(prop => !req[type][prop])
		.reduce((acc, prop) => [...acc, {[prop]: `Required paramter: '${prop}'`}], []);

	if (neededProps.length === 1) {
		return next(createError(422, Object.values(neededProps[0])[0]));
	}

	if (neededProps.length > 1) {
		return next(createError(422, 'Required paramters missing', {errors: neededProps}));
	}

	next();
};

const requiredBodyProps = requiredMany('body');

const validatePassword = (req, res, next) => {
	if (checkPassword(req.body.password)) {
		return next();
	}
	return next(createError(422, 'Username or password is invalid.'));
};

const tryParseNumber = type => prop => (req, res, next) => {
	const num = req[type][prop];
	if (!num)
		return next();
	if (!isNumber(num))
		return next(createError(422, `Paramter ${prop} is not a number: '${num}'.`));
	req[type][prop] = parseInt(num);
	next();
};

const trySanitizeInput = type => prop => (req, res, next) => {
	const input = req[type][prop];
	if (!input) return next();
	req[type][prop] = sanitize(input);
	next();
};

const sanitizeInputs = type => (req, res, next) => {
	Object.entries(req[type])
		.forEach(([key, value]) => req[type][key] = sanitize(value));

	next();
};

const checkPlaylist = (req, res, next) => {
	const check = Object
		.keys(Channel.schema.obj.playlists)
		.includes(req.params.playlist);
	
	if (check) return next();
	return next(createError(404, `Playlist '${req.params.playlist}' does not exist.`));
};

const checkObjectId = prop => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req[prop].id))
		return next(createError(422, 'Param id is invalid.'));
	return next();
};

const checkValidSettings = (req, res, next) => {
	const check = Object
		.keys(Channel.schema.obj.playlists)
		.includes(req.body.playmode);

	if (check) return next();
	return next(createError(422, `'${req.body.playmode}' is not a valid setting value.`));
};

module.exports = {
	parseChannel,
	parseSong,
	requiredQuery,
	requiredBody,
	requiredBodyProps,
	validatePassword,
	tryParseNumber,
	trySanitizeInput,
	sanitizeInputs,
	checkPlaylist,
	checkObjectId,
	checkValidSettings
};
