const express = require('express');
const {Channel} = require('../modals'); 
const defaultProps = require('../middle-ware/defaultQueries');
const {auth} = require('../middle-ware/auth');
const {
	songsForChannel, 
	userForChannel, 
	channelUpdate,
	channelsUpdate
} = require('../middle-ware/youtube');
const {
	nextError, 
	validateErrors, 
	castError, 
	errorIfNull,
	errorStatus
} = require('../utils/errors');
const {
	parseChannel, 
	requiredQuery, 
	tryParseNumber,
	trySanitizeInput,
	checkPlaylist,
	checkObjectId
} = require('../middle-ware/validateYoutube');

const router = express.Router();

const success = (status, res) => fetched => res.status(status)
	.json(fetched);
const successEnd = (status, res) => () => res.status(status)
	.end();
const getData = fetched => fetched.data;
const toData = data => ({items: data});

const getChannelsMW = [
	auth, 
	tryParseNumber('query')('page'), 
	tryParseNumber('query')('skip'),
	trySanitizeInput('query')('text')
];

const getChannelsSongsMW = [
	auth
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

const putChannelMW = [
	auth,
	trySanitizeInput('params')('id'),
	trySanitizeInput('params')('playlist'),
	checkObjectId('params'),
	checkPlaylist,
	channelUpdate,
	userForChannel
];

const putChannelsUpdate = [
	auth,
	channelsUpdate
];

const deleteChannelMW = [
	auth,
	trySanitizeInput('params')('id'),
	checkObjectId('params')
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

//GET channels/songs
router.get('/channels/songs', getChannelsSongsMW, (req, res, next) => {
	return Channel.findAllSongs(req.user)
		.then(success(200, res))
		.catch(nextError(500, 'Could not get all of users songs at this time.', next));
});

//POST channels
router.post('/channels', postChannelsMW, (req, res, next) => {
	const {channel} = req;
	return Channel.findOneAndUpdate(
		{youtubeId: channel.youtubeId},
		{...channel, $push: {'users': req.channelUser}},
		{upsert: true, setDefaultsOnInsert: true}
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
	return Channel.findOneChannel(req.params.id, req.user)
		.then(errorIfNull(404, 'Cannot find channel.'))
		.then(success(200, res))
		.catch(castError(next))
		.catch(errorStatus(404, next))
		.catch(nextError(500, 'Could not obtain channel.', next));
});

//PUT channels/:id
router.put('/channels/:id/playlist/:playlist', putChannelMW, (req, res, next) => {
	const {channel, channelUser} = req;
	return Channel.updateChannelPlaylist(channel, channelUser)
		.then(success(200, res))
		.catch(nextError(500, 'Could not update channel playlist mode.', next));
});

//PUT channels/update
router.put('/channels/update', putChannelsUpdate, (req, res, next) => {
	const {channels} = req;
	console.log(channels);
	if (channels.length > 0) { 
		return Channel.updateManyChannels(channels)
			.then(successEnd(200, res))
			.catch(nextError(500, 'Could not update channels.', next));
	}
	return successEnd(200, res)();
});

//DELETE channels/:id
router.delete('/channels/:id', deleteChannelMW, (req, res, next) => {
	const {id} = req.params;
	return Channel.deleteUserInChannel(id, req.user)
		.then(success(200, res))
		.catch(errorStatus(404, next))
		.catch(nextError(500, 'Channel could not be deleted.', next));
});

module.exports = router;
