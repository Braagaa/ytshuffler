const express = require('express');
const {Channel} = require('../modals'); 
const {nextError, validateErrors} = require('../utils/errors');
const {parseChannel} = require('../middle-ware/validateYoutube');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);

//POST channels
router.post('/channels', parseChannel, (req, res, next) => {
	return Channel.create(req.channel)
		.then(success(res))
		.catch(validateErrors(next))
		.catch(nextError(
			500, 
			`Could not store channel ${req.channel.title || ''} at this time.`, 
			next
		));
});

module.exports = router;
