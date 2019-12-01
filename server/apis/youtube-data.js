const axios = require('axios');
const {reThrow} = require('../utils/errors');

const {TOPIC_ID_MUSIC} = require('../data/youtube-data-api');
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const baseUrl = 'https://www.googleapis.com/youtube/v3';
const searchUrl = baseUrl + '/search';
const channelUrl = baseUrl + '/channels';
const videosUrl = baseUrl + '/videos';
const activitiesUrl = baseUrl + '/activities';

const getAxios = (url, initlQuery) => (query = {}, config = {}) => 
	axios.get(url, {
		params: {
			...initlQuery,
			...query
		},
		...config
	})
		.then(({status, statusText, data}) => ({
			status,
			statusText,
			data
		}))
		//log this here
		//.catch(reThrow(console.error));

const getSearchChannels = getAxios(searchUrl, {
	part: 'id',
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

const getChannelUpdate = getAxios(channelUrl, {
	part: 'statistics',
	maxResults: 1,
	key: YOUTUBE_API_KEY
});

const getChannelUpdateImage = getAxios(channelUrl, {
	part: 'snippet',
	maxResults: 1,
	key: YOUTUBE_API_KEY
});

const getVideosObj = {
	part: 'snippet,contentDetails,topicDetails',
	maxResults: 50,
	key: YOUTUBE_API_KEY
};

const getVideos = getAxios(videosUrl, getVideosObj);

module.exports = {
	getSearchChannels,
	getSearchVideos,
	getChannels,
	getChannelUpdate,
	getChannelUpdateImage,
	getVideos
};
