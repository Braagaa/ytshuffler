const express = require('express');
const {Channel} = require('../modals'); 
const {nextError, validateErrors} = require('../utils/errors');
const {parseChannel, songsForChannel} = require('../middle-ware/validateYoutube');
const defaultProps = require('../middle-ware/defaultQueries');

const router = express.Router();

const success = res => fetched => res.status(200).json(fetched);
const getData = fetched => fetched.data;
const toData = data => ({items: data});

//POST channels
router.post(
	'/channels', 
	defaultProps('body', {order: 'date'}), 
	parseChannel, 
	songsForChannel,
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
