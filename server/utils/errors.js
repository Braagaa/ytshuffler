const createError = require('http-errors');

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

const errorIfNull = errorIf(data => data === null);

module.exports = {
	nextError,
	reThrow,
	requiredParamter,
	validateErrors,
	duplicateError,
	errorIf,
	errorIfNull,
	asyncErrorIf
};
