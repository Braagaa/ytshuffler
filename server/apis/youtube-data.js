const axios = require('axios');
const {tap} = require('../utils/func');

const {TOPIC_ID_MUSIC} = require('../data/youtube-data-api');
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const baseUrl = 'https://www.googleapis.com/youtube/v3';
const searchUrl = baseUrl + '/search';

const getAxios = (url, initlQuery) => query => 
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
		.catch(tap(console.error));

const getSearch = getAxios(searchUrl, {
	part: 'snippet',
	maxResults: 50,
	safeSearch: 'none',
	topicId: TOPIC_ID_MUSIC,
	type: 'channel',
	key: YOUTUBE_API_KEY
})

module.exports = {
	getSearch
};
