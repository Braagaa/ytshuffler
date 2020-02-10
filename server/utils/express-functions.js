const port = process.env.PORT || 3001;
const isLocal = process.env.LOCAL;

const baseUrl = req => `${req.protocol}://${req.hostname}${isLocal ? `:${port}` : ''}}`
	.replace('}', '');

module.exports = {baseUrl};
