const createError = require('http-errors');

const nextError = (status, message, next) => () => {
	const error = createError(status, message);
	next(error);
	return error;
}

module.exports = {
	nextError
};
