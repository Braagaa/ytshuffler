const express = require('express');
const {nextError, errorIfNull} = require('../utils/errors');
const {User} = require('../modals');
const {auth} = require('../middle-ware/auth'); 

const router = express.Router();

const success = (status, res) => fetched => 
	res.status(status).json(fetched);

router.get('/', auth, (req, res,next) => {
	return User.find({id: req.jwt.useruuid})
		.then(success(200, res))
		.then(errorIfNull(404, 'User cannot be found.'))
		.catch(next);
});

module.exports = router;
