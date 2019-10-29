const express = require('express');
const {Channel} = require('../modals'); 
const defaultProps = require('../middle-ware/defaultQueries');
const {auth} = require('../middle-ware/auth');
const {
	nextError, 
	validateErrors, 
	castError, 
	errorIfNull,
	errorStatus
} = require('../utils/errors');
const {
	parseChannel, 
	songsForChannel, 
	requiredQuery, 
	userForChannel,
	tryParseNumber,
	trySanitizeInput
} = require('../middle-ware/validateYoutube');

const router = express.Router();

const success = (status, res) => fetched => res.status(status)
	.json(fetched);
const getData = fetched => fetched.data;
const toData = data => ({items: data});

const getChannelsMW = [
	auth, 
	tryParseNumber('query')('page'), 
	tryParseNumber('query')('skip'),
	trySanitizeInput('query')('text')
];

const postChannelsMW = [
	defaultProps('body', {order: 'date'}), 
	auth,
	parseChannel, 
	songsForChannel,
	userForChannel,
];

const getChannelMW = [
	auth,
	trySanitizeInput('params')('id')
];

//GET channels
router.get('/channels', getChannelsMW, (req, res, next) => {
	const{page, skip, text} = req.query;
	return Channel.allChannelsForUser(req.user, page, skip, text)
		.then(success(200, res))
		.catch(
			nextError(500, 'Your channels could not be obtained.', next)
		);
});

//POST channels
router.post('/channels', postChannelsMW, (req, res, next) => {
	const {channel} = req;
	return Channel.findOneAndUpdate(
		{youtubeId: channel.youtubeId},
		{...channel, $push: {'users': req.channelUser}},
		{upsert: true}
	)
		.then(success(201, res))
		.catch(validateErrors(next))
		.catch(nextError(
			500, 
			`Could not store channel ${req.channel.title || ''} at this time.`, 
			next
		));
});

//GET channels/:id
router.get('/channels/:id', getChannelMW, (req, res, next) => {
	return Channel.findOne(
		{_id: req.params.id, 'users.id': req.user._id}, 
		{users: 0, 'songs.playmodes': 0}
	)
		.then(errorIfNull(404, 'Cannot find channel.'))
		.then(success(200, res))
		.catch(castError(next))
		.catch(errorStatus(404, next))
		.catch(nextError(500, 'Could not obtain channel.', next));
});

module.exports = router;
