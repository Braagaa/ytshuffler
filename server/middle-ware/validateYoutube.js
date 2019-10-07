const app = require('../app');
const createError = require('http-errors');
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

const collectItems = max => (data, params = {}, videos = []) => {
	videos = [...videos, ...data.items];
	if (videos.length >= max || !data.nextPageToken) 
		return Promise.resolve(videos.slice(0, max));
	return getSearchVideos({...params, pageToken: data.nextPageToken})
		.then(fetched => fetched.data)
		.then(data => getMaximumItems(data, params, videos));
};
const getMaximumItems = collectItems(maxSongs);
//This is where we obtain the songs for the selected channel through
//a youtube search
const songsForChannel = (req, res, next) => {
	const {youtubeId: channelId, order} = req.channel;
	getSearchVideos({channelId, order})
		.then(fetched => fetched.data)
		.then(data => getMaximumItems(data, {channelId, order}))
		.then(map(searchVideo => searchVideo.id.videoId))
		.then(splitEvery(50))
		.then(map(method('join', ',')))
		.then(asyncMap(videoIdsString => getVideos({id: videoIdsString})))
		.then(map(videos => videos.data.items))
		.then(flat)
		.then(map(video => ({
			youtubeId: video.id,
			title: video.snippet.title,
			thumbnail_url: video.snippet.thumbnails.medium.url,
			duration: video.contentDetails.duration,
			topics: video.topicDetails.topicIds
		})))
		.then(videos => {
			//side effects
			req.channel.songs = videos;
			next();
		})
		.catch(nextError(500, 'Songs cannot be obtained.', next));
};

module.exports = {
	parseChannel,
	parseSong,
	songsForChannel,
	requiredQuery,
	requiredBody,
	requiredBodyProps,
	validatePassword
};
