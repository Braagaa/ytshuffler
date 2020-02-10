const port = process.env.PORT || 3001;

const baseUrl = req => `${req.protocol}://${req.hostname}:${port}}`
	.replace('}', '');

module.exports = {baseUrl};
