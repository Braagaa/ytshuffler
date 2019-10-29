const app = require('../app');
const createError = require('http-errors');
const isNumber = require('is-number');
const sanitize = require('mongo-sanitize');

const {capitalize} = require('../utils/capitalize');
const {getSearchVideos, getVideos} = require('../apis/youtube-data');
const {nextError} = require('../utils/errors');
const checkPassword = require('../utils/password');
const {map, asyncMap, splitEvery, flat, method} = require('../utils/func');

const maxSongs = process.env.REACT_APP_MAX_NUMBER_SONGS || 100;

const parse = type => (req, res, next) => {
	if (req.body.kind === 'youtube#' + type) {
		req[type] = req.body;
		return next();
	}
	return next(createError(422, `Youtube ${capitalize(type)} not in body.`));
};

const parseChannel = parse('channel');
const parseSong = parse('song');

const required = type => prop => (req, res, next) => {
	if (!req[type][prop])
		next(createError(422, `Required paramter: '${prop}'`));
	next();
};

const requiredQuery = required('query');
const requiredBody = required('body');

const requiredMany = type => props => (req, res, next) => {
	const neededProps = props
		.filter(prop => !req[type][prop])
		.reduce((acc, prop) => [...acc, {[prop]: `Required paramter: '${prop}'`}], []);

	if (neededProps.length === 1) {
		return next(createError(422, Object.values(neededProps[0])[0]));
	}

	if (neededProps.length > 1) {
		return next(createError(422, 'Required paramters missing', {errors: neededProps}));
	}

	next();
};

const requiredBodyProps = requiredMany('body');

const validatePassword = (req, res, next) => {
	if (checkPassword(req.body.password)) {
		return next();
	}
	return next(createError(400, 'Username or password is invalid.'));
};

const tryParseNumber = type => prop => (req, res, next) => {
	const num = req[type][prop];
	if (!num)
		return next();
	if (!isNumber(num))
		return next(createError(422, `Paramter ${prop} is not a number: '${num}'.`));
	req[type][prop] = parseInt(num);
	next();
};

const trySanitizeInput = type => prop => (req, res, next) => {
	const input = req[type][prop];
	if (!input) return next();
	console.log(sanitize(input));
	req[type][prop] = sanitize(input);
	next();
};

const songsForChannel = async (req, res, next) => {
	try {
		const {youtubeId: channelId, order} = req.channel;
		let searchResults = await getSearchVideos({channelId, order});
		let etags = [searchResults.data.etag];
		let videos = searchResults.data.items;

		while (videos.length < maxSongs && searchResults.data.nextPageToken) {
			searchResults = await getSearchVideos({
				channelId, 
				order, 
				pageToken: searchResults.data.nextPageToken
			});
			etags = etags.concat(searchResults.data.etag);
			videos = [...videos, ...searchResults.data.items];
		}
		
		videos = videos.slice(0, maxSongs)
			.map(searchVideo => searchVideo.id.videoId);

		let videosString = splitEvery(50)(videos)
			.map(method('join', ','));

		videos = await asyncMap(videoIdsString => getVideos({id: videoIdsString}))(videosString);
		videos = videos.map(videos => videos.data.items);
		videos = flat(videos)
			.map(video => ({
				youtubeId: video.id,
				playmodes: [order],
				title: video.snippet.title,
				thumbnail_url: video.snippet.thumbnails.default.url,
				duration: video.contentDetails.duration,
				topics: video.topicDetails.topicIds
			}));

		req.channel.songs = videos;
		req.channel.etags = {[order]: etags};

		return next();
	} catch(e) {
		console.log(e);
		next(createError(500, 'Cannot create channel.'));
	};
};

const userForChannel = (req, res, next) => {
	const {user, channel} = req;
	if (!user || !channel) {
		return next(createError(422, 'User or channel not found.'));
	}

	req.channelUser = {
		id: user.id,
		playmode: user.settings.playmode
	};

	return next();
};

module.exports = {
	parseChannel,
	parseSong,
	songsForChannel,
	userForChannel,
	requiredQuery,
	requiredBody,
	requiredBodyProps,
	validatePassword,
	tryParseNumber,
	trySanitizeInput
};
