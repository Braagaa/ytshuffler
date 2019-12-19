const createError = require('http-errors');
const {path} = require('./func');

const nextError = (status, message, next) => e => {
	console.log(e);
	const error = createError(status, message);
	next(error);
	return error;
};

const requiredParamter = (paramter, next) =>
	nextError(422, `Required paramter: ${paramter}`, next);

const reThrow = fn => arg => {
	fn(arg);
	throw arg;
};

const validateErrors = next => error => {
	if (error.errors) {
		console.log(error);
		const errors = Object.entries(error.errors)
			.reduce(
				(acc, [key, value]) => [...acc, {[key]: value.message}], []);
		next(createError(422, error.name, {errors}));
	}
};

const duplicateError = (msg, next) => error => {
	if (error.name === 'MongoError' && error.code === 11000) {
		return next(createError(422, msg));
	}

	throw error;
};

const castError = next => error => {
	if (error.name === 'CastError') {
		return next(createError(422, `Path '${error.path}' failed for value '${error.value}'`));
	}

	throw error;
};

const errorIf = fn => (status, msg) => data => {
	if (fn(data)) {
		throw createError(status, msg);
	}
	return data;
};

const asyncErrorIf = fn => (status, msg) => async data => {
	if (await fn(data)) {
		throw createError(status, msg);
	}
	return data;
};

const errorIfNull = errorIf(data => data === null || data === undefined);

const errorStatus = (status, next) => error => {
	if (error.status === status)
		return next(error);
	throw error;
};

const pathError = (pathStr, status, msg) => data => {
	try {
		const path = path(pathStr)(data);
		if (path === null || path === undefined)
			throw data;
		return data;
	} catch(e) {
		throw createError(status, msg);
	};
};

const checkQuotaError = e => e.response && e.response.data.error.code === 403;
const createQuotaExceededError = () => createError(
	403, 
	'Youtube quoata has been reached. Try again after 3:00 AM EST.'
);

const quotaExceeded = next => e => {
	if (checkQuotaError(e)) {
		return next(createQuotaExceededError());
	}
	throw e;
};

const exceedsRequestSpotify = (res, next) => e => {
	const response = e.response;
	if (response.status === 429) {
		res.set('Retry-After', (parseInt(response.headers['Retry-After']) + 1) * 1000);
		next(createError(429, response.statusText));
	}
	throw e;
};

module.exports = {
	checkQuotaError,
	createQuotaExceededError,
	nextError,
	reThrow,
	requiredParamter,
	validateErrors,
	duplicateError,
	exceedsRequestSpotify,
	errorIf,
	errorIfNull,
	pathError,
	asyncErrorIf,
	castError,
	errorStatus,
	quotaExceeded
};
