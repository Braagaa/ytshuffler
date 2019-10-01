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
		const errors = Object.entries(error.errors)
			.reduce(
				(acc, [key, value]) => [...acc, {[key]: value.message}], []);
		next(createError(422, error.name, {errors}));
	}
};

module.exports = {
	nextError,
	reThrow,
	requiredParamter,
	validateErrors
};
