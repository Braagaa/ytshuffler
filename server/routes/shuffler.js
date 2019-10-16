const express = require('express');
const {Channel} = require('../modals'); 
const {nextError, validateErrors} = require('../utils/errors');
const {parseChannel, songsForChannel, requiredQuery, userForChannel} = require('../middle-ware/validateYoutube');
const defaultProps = require('../middle-ware/defaultQueries');
const {auth} = require('../middle-ware/auth');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);
const getData = fetched => fetched.data;
const toData = data => ({items: data});

//GET channels
router.get('/channels', (req, res, next) => {
	return Channel.find({})
		.then(toData)
		.then(success(res))
		.catch(
			nextError(500, 'Your channels could not be obtained.', next)
		);
});

//POST channels
router.post(
	'/channels', 
	defaultProps('body', {order: 'date'}), 
	auth,
	parseChannel, 
	songsForChannel,
	userForChannel,
	(req, res, next) => {
		return Channel.create(req.channel)
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
