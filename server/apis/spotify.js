const axios = require('axios');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const accountsBaseUrl = 'https://accounts.spotify.com';
const spotifyBaseUrl = 'https://api.spotify.com/v1';
const tokenUrl = accountsBaseUrl + '/api/token';
const searchUrl = spotifyBaseUrl + '/search';

const getRequestToken = () => axios({
	method: 'post',
	url: tokenUrl,
	params: {
		grant_type: 'client_credentials'
	},
	auth: {username: SPOTIFY_CLIENT_ID, password: SPOTIFY_CLIENT_SECRET}
});

const getSearchArtist = accessToken => artist => axios({
	method: 'get',
	url: searchUrl,
	params: {
		q: artist,
		type: 'artist',
		limit: 1
	},
	headers: {Authorization: `Bearer ${accessToken}`}
});

module.exports = {
	getRequestToken,
	getSearchArtist
};
