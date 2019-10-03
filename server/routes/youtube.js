const express = require('express');
const {nextError, requiredParamter} = require('../utils/errors');
const {requiredQuery} = require('../middle-ware/validateYoutube');
const {getSearchChannels, getChannels} = require('../apis/youtube-data');
const {Channel} = require('../modals/'); 
const topicIds = require('../data/youtube-topic-ids');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);
const toData = data => ({items: data});
const getData = fetched => fetched.data;
const getItems = fetched => fetched.data.items;

//GET SEARCH CHANNELS
router.get('/search/channels', requiredQuery('q'), (req, res, next) => {
	return getSearchChannels({q: req.query.q})
		.then(fetched => res.status(200).json(fetched.data))
		.catch(
			nextError(500, 'No Channels can not be found at this time.', next)
		);
});

//GET CHANNELS
router.get('/channels', requiredQuery('ids'), (req, res, next) => {
	return getChannels({id: req.query.ids})
		.then(fetched => fetched.data.items)
		.then(channels => [
			channels,
			...channels.map(({id}) => Channel.exists({youtubeId: id}))
		])
		.then(data => Promise.all(data))
		.then(([channels, ...bools]) => 
			bools.map((bool, i) => ({...channels[i], inUserChannels: bool}))
		)
		.then(toData)
		.then(success(res))
		.catch(nextError(500, 'Channels cannot be retrieved at this time.', next));
});

//GET TOPIC_IDS
router.get('/topicIds', (req, res, next) => res.status(200).json(topicIds));

module.exports = router;
