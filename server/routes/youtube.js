const express = require('express');
const {nextError, requiredParamter} = require('../utils/errors');
const {getSearch, getChannels} = require('../apis/youtube-data');
const topicIds = require('../data/youtube-topic-ids');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched.data);

//GET SEARCH
router.get('/search', (req, res, next) => {
	if (req.query.q) {
		return getSearch({q: req.query.q})
			.then(success(res))
			.catch(nextError(500, 'No Channels can be found at this time.', next));
	}
	return requiredParamter('q', next)();
});

//GET CHANNELS
router.get('/channels', (req, res, next) => {
	if (req.query.ids) {
		return getChannels({id: req.query.ids})
			.then(success(res))
			.catch(nextError(500, 'Channels cannot be retrieved at this time.', next));
	}
	return requiredParamter('ids', next)();
});

//GET TOPIC_IDS
router.get('/topicIds', (req, res, next) => res.status(200).json(topicIds));

module.exports = router;
