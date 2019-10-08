const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const options = {expiresIn: '5h'};

const generateJWT = secret => options => data => 
	jwt.sign(data, secret, options);

module.exports = {
	generateJWT: generateJWT(secret),
};
