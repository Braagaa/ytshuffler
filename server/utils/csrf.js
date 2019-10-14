const Tokens = require('csrf');
const secret = process.env.CSRF_SECRET;
const env = process.env.NODE_ENV;

const generateCSRF = (Tokens, secret) => () => Tokens().create(secret);

const toCSRFHeader = res => token => res.set('CSRF', token);

module.exports = {
	generateCSRF: generateCSRF(Tokens, secret),
	toCSRFHeader
};
