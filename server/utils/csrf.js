const Tokens = require('csrf');
const secret = process.env.CSRF_SECRET;
const env = process.env.NODE_ENV;

const generateCSRF = (Tokens, secret) => () => Tokens().create(secret);

const userCSRFHeader = res => ({csrf}) => res.set('CSRF', csrf);

module.exports = {
	generateCSRF: generateCSRF(Tokens, secret),
	userCSRFHeader
};
