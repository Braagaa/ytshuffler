const createError = require('http-errors');
const {capitalize} = require('../utils/capitalize');

const parse = type => (req, res, next) => {
	if (req.body.kind === 'youtube#' + type) {
		req[type] = req.body;
		return next();
	}
	return next(createError(422, `Youtube ${capitalize(type)} not in body.`));
};

const parseChannel = parse('channel');
const parseSong = parse('song');

module.exports = {
	parseChannel,
	parseSong
};
