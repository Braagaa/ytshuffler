const createError = require('http-errors');

const nextError = (status, message, next) => () => {
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

module.exports = {
	nextError,
	reThrow,
	requiredParamter
};
