const express = require('express');
const {nextError, errorIfNull} = require('../utils/errors');
const {User, Channel} = require('../modals');
const {auth} = require('../middle-ware/auth'); 
const {trySanitizeInput} = require('../middle-ware/validateYoutube');

const video_infoMW = [
	auth,
	trySanitizeInput('params')('id')
];

const router = express.Router();

const success = (status, res) => fetched => 
	res.status(status).json(fetched);

router.get('/', auth, (req, res, next) => {
	return User.find({id: req.jwt.useruuid})
		.then(success(200, res))
		.then(errorIfNull(404, 'User cannot be found.'))
		.catch(next);
});

router.get('/video_info/:id', video_infoMW, (req, res, next) => {
	return Channel.findOne(
		{_id: req.params.id, 'users.id': req.user.id},
		{"users.$": 1}
	)
		.then(data => data.users[0])
		.then(success(200, res))
		.catch(next);
});

module.exports = router;
