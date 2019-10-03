const axios = require('axios');
const {reThrow} = require('../utils/errors');

const {TOPIC_ID_MUSIC} = require('../data/youtube-data-api');
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const baseUrl = 'https://www.googleapis.com/youtube/v3';
const searchUrl = baseUrl + '/search';
const channelUrl = baseUrl + '/channels';
const videosUrl = baseUrl + '/videos';

const getAxios = (url, initlQuery) => (query = {}) => 
	axios.get(url, {
		params: {
			...initlQuery,
			...query
		}
	})
		.then(({status, statusText, data}) => ({
			status,
			statusText,
			data
		}))
		//log this here
		.catch(reThrow(console.error));

const getSearchChannels = getAxios(searchUrl, {
	part: 'snippet',
	maxResults: 50,
	safeSearch: 'none',
	topicId: TOPIC_ID_MUSIC,
	type: 'channel',
	key: YOUTUBE_API_KEY
});

const getSearchVideos = getAxios(searchUrl, {
	part: 'id',
	safeSearch: 'none',
	type: 'video',
	maxResults: 50,
	key: YOUTUBE_API_KEY
});

const getChannels = getAxios(channelUrl, {
	part: 'snippet,statistics,topicDetails',
	maxResults: 10,
	key: YOUTUBE_API_KEY
});

const getVideos = getAxios(videosUrl, {
	part: 'snippet,contentDetails,topicDetails',
	maxResults: 50,
	key: YOUTUBE_API_KEY
});

module.exports = {
	getSearchChannels,
	getSearchVideos,
	getChannels,
	getVideos
};
