const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV || 'dev';

const options = {expiresIn: '1d'};

const generateJWT = secret => options => data => 
	jwt.sign(data, secret, options);

const splitJWTEncoded = tokenEncoded => {
	const [header, payload, signature] = tokenEncoded
		.split('.');
	return [header + '.' + payload, signature];
};

const toCookies = res => ([headerPayload, signature]) => {
	res.cookie('JWT-HP', headerPayload, {
		secure: nodeEnv === 'production',
		maxAge: 1000 * 60 * 60 * 1
	});
	res.cookie('JWT-S', signature, {
		secure: nodeEnv === 'production',
		httpOnly: true
	});
	return [headerPayload, signature];
};

module.exports = {
	generateJWT: generateJWT(secret),
	splitJWTEncoded,
	toCookies
};
