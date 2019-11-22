const express = require('express');
const {nextError, errorIfNull} = require('../utils/errors');
const {Channel} = require('../modals');
const {User} = require('../modals/User');
const {auth} = require('../middle-ware/auth'); 
const {prop} = require('../utils/func');
const {
	checkValidSettings, 
	trySanitizeInput, 
	sanitizeInputs
} = require('../middle-ware/validateYoutube');

const video_infoMW = [
	auth,
	trySanitizeInput('params')('id')
];

const settingsMW = [
	auth,
	sanitizeInputs('body'),
	checkValidSettings
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

router.get('/settings', auth, (req, res, next) => {
	const {settings} = req.user;
	return res.status(200)
		.json(settings);
});

router.put('/settings', settingsMW, (req, res, next) => {
	return User.findByIdAndUpdate(
		req.user.id,
		{settings: req.body},
		{new: true, select: {settings: 1}}
	)
		.then(prop('settings'))
		.then(success(200, res))
		.catch(nextError(500, 'Could not change settings', next));
});

module.exports = router;
