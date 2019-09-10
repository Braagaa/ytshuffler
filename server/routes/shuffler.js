const express = require('express');
const {nextError} = require('../utils/errors');
const {tap} = require('../utils/func');
const {getSearch} = require('../apis/youtube-data');

const router = express.Router();

//GET SEARCH
router.get('/search', (req, res, next) => {
	if (req.query.q) {
		return getSearch({q: req.query.q})
			.then(data => res.json(data))
			.catch(nextError(500, 'No Channels can be found at this time.', next));
	}
	return nextError(422, 'Required paramter: q', next)();
});

module.exports = router;
