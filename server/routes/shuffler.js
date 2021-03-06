const express = require('express');
const {Channel} = require('../modals'); 
const defaultProps = require('../middle-ware/defaultQueries');
const {auth} = require('../middle-ware/auth');
const {
	songsForChannel, 
	userForChannel, 
	channelUpdate,
	channelsUpdate,
	channelUpdateImage
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
const {frontEndFields} = require('../utils/queries');

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
	trySanitizeInput('query')('text'),
	trySanitizeInput('query')('favourites'),
	defaultProps('query', {favourites: false})
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

const putChannelFav = [
	auth,
	checkObjectId('params'),
	defaultProps('body', {favorite: true})
];

const getChannelMW = [
	auth,
	trySanitizeInput('params')('id')
];

const getChannelsPlaylistsGenreMW = [
	trySanitizeInput('query')('genres'),
	auth
];

const getChannelsPlaylistsArtistsMW = [
	auth,
	tryParseNumber('query')('page'),
	tryParseNumber('query')('skip'),
	trySanitizeInput('query')('text')
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

const putChannelImageMW = [
	auth,
	trySanitizeInput('params')('id'),
	checkObjectId('params'),
	channelUpdateImage
];

const putChannelsUpdate = [
	auth,
	channelsUpdate
];

const deleteChannelsMW = [
	auth
];

const deleteChannelMW = [
	auth,
	trySanitizeInput('params')('id'),
	checkObjectId('params')
];

//GET channels
router.get('/channels', getChannelsMW, (req, res, next) => {
	const{page, skip, text, favourites} = req.query;
	return Channel.allChannelsForUser(req.user, page, skip, text, favourites)
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

//GET channels/genres
router.get('/channels/genres', auth, (req, res, next) => {
	return Channel.getGenres(req.user)
		.then(success(200, res))
		.catch(nextError(500, 'Could not get genres.', next));
});

//GET channels/favourites/songs
router.get('/channels/favourites/songs', auth, (req, res, next) => {
	return Channel.getFavouriteChannelSongs(req.user)
		.then(success(200, res))
		.catch(nextError(500, 'Could not obtain favourite songs.', next));
});

//GET channels/playlists/genre
router.get('/channels/playlists/genres', getChannelsPlaylistsGenreMW, (req, res, next) => {
	return Channel.getGenrePlaylists(req.user, req.query.genres)
		.then(success(200, res))
		.catch(nextError(500, 'Could not obtain genre playlist.', next));
});

//GET channels/playlists/artists
router.get('/channels/playlists/artists', getChannelsPlaylistsArtistsMW, (req, res, next) => {
	const {page, skip, text} = req.query;
	return Channel.getArtistsPlaylist(req.user, page, skip, text)
		.then(success(200, res))
		.catch(nextError(500, 'Could not obtain artists playlist.', next));
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

//PUT channels/:id/update/image
router.put('/channels/:id/update/image', putChannelImageMW, (req, res, next) => {
	return Channel.findByIdAndUpdate(
		req.channel.id, 
		{thumbnail_url: req.channel.thumbnail_url},
		{new: true, select: {playlists: 0, totalVideoCounts: 0, users: 0}}
	)
		.then(success(200, res))
		.catch(nextError(500, 'Could not update channels image.', next));
});

//PUT channels/:id/favourite
router.put('/channels/:id/favourite', auth, (req, res, next) => {
	const {params: {id}, body: {favourite}, user} = req;
	return Channel.findOneAndUpdate(
		{_id: id, 'users.id': user._id},
		{$set: {'users.$.isFavourite': favourite}},
		{new: true}
	)
		.then(frontEndFields)
		.then(success(200, res))
		.catch(nextError(500, 'Could not update favourite status.', next));
});

//DELETE channels/
router.delete('/channels', deleteChannelsMW, (req, res, next) => {
	return Channel.deleteUserInChannels(req.user)
		.then(successEnd(200, res))
		.catch(nextError(500, 'Could not delete all channels.', next));
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
