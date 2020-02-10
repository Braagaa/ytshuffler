const jwt = require('jsonwebtoken');
const {generateCSRF, userCSRFHeader} = require('../utils/csrf');
const {tap} = require('../utils/func');

const secret = process.env.JWT_SECRET;
const emailSecret = process.env.EMAIL_SECRET;
const nodeEnv = process.env.NODE_ENV || 'development';
const productionTest = process.env.HTTPS;

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
		secure: nodeEnv === 'production' && !productionTest,
		maxAge: 1000 * 60 * 60 * 1
	});
	res.cookie('JWT-S', signature, {
		secure: nodeEnv === 'production' && !productionTest,
		httpOnly: true
	});
	return [headerPayload, signature];
};

const userTokenData = req => user => ({
	useruuid: user.id,
	csrf: req.get('CSRF') || generateCSRF(),
	settings: user.settings,
	audience: 'user'
});
const emailTokenData = user => ({
	useruuid: user.id,
	audience: 'user'
});

const completeJWT = (req, res, createToken) => user => Promise
	.resolve(user)
	.then(userTokenData(req))
	.then(tap(userCSRFHeader(res)))
	.then(createToken)
	.then(splitJWTEncoded)
	.then(toCookies(res));

const emailJWT = (email, createTokenFn) => user => Promise
	.resolve(user)
	.then(emailTokenData)
	.then(createTokenFn);

module.exports = {
	generateJWT: generateJWT(secret),
	generateEmailJWT: generateJWT(emailSecret),
	splitJWTEncoded,
	toCookies,
	userTokenData,
	completeJWT,
	emailJWT
};
