const express = require('express');
const {Channel} = require('../modals'); 
const {nextError, validateErrors} = require('../utils/errors');
const defaultProps = require('../middle-ware/defaultQueries');
const {auth} = require('../middle-ware/auth');
const {
	parseChannel, 
	songsForChannel, 
	requiredQuery, 
	userForChannel,
	tryParseNumber,
	trySanitizeInput
} = require('../middle-ware/validateYoutube');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);
const getData = fetched => fetched.data;
const toData = data => ({items: data});

const getChannelMW = [
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

//GET channels
router.get('/channels', getChannelMW, (req, res, next) => {
	const{page, skip, text} = req.query;
	return Channel.allChannelsForUser(req.user, page, skip, text)
		.then(success(res))
		.catch(
			nextError(500, 'Your channels could not be obtained.', next)
		);
});

//POST channels
router.post('/channels', postChannelsMW, (req, res, next) => {
		const {channel} = req;
		return Channel.findOneAndUpdate({
			youtubeId: channel.youtubeId},
			channel,
			{upsert: true}
		)
			.then(success(res))
			.catch(validateErrors(next))
			.catch(nextError(
				500, 
				`Could not store channel ${req.channel.title || ''} at this time.`, 
				next
			));
	}
);

module.exports = router;
