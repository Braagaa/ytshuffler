const express = require('express');
const {nextError, requiredParamter, quotaExceeded} = require('../utils/errors');
const {requiredQuery} = require('../middle-ware/validateYoutube');
const {getSearchChannels, getChannels} = require('../apis/youtube-data');
const {Channel} = require('../modals/'); 
const {auth} = require('../middle-ware/auth');
const {ifUserInChannels} = require('../utils/queries');
const topicIds = require('../data/youtube-topic-ids');
const {tap} = require('../utils/func');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);
const toData = data => ({items: data});
const getData = fetched => fetched.data;
const getItems = fetched => fetched.data.items;

//GET SEARCH CHANNELS
router.get('/search/channels', requiredQuery('q'), (req, res, next) => {
	return getSearchChannels({q: req.query.q})
		.then(fetched => res.status(200).json(fetched.data))
		.catch(quotaExceeded(next))
		.catch(
			nextError(500, 'No Channels can not be found at this time.', next)
		);
});

//GET CHANNELS
router.get('/channels', 
	requiredQuery('ids'), 
	auth,
	(req, res, next) => {
		return getChannels({id: req.query.ids})
			.then(fetched => fetched.data.items)
			.then(channels => [
				channels,
				ifUserInChannels(Channel, channels, req.user)
			])
			.then(data => Promise.all(data))
			.then(([channels, foundChannelIds]) => 
				channels.map(channel => ({
					...channel, 
					foundChannel: foundChannelIds
						.reduce((acc, c) => channel.id === c.youtubeId ? c : acc, null)
			})))
			.then(toData)
			.then(success(res))
			.catch(quotaExceeded(next))
			.catch(nextError(500, 'Channels cannot be retrieved at this time.', next));
	}
);

//GET TOPIC_IDS
router.get('/topicIds', (req, res, next) => res.status(200).json(topicIds));

module.exports = router;
