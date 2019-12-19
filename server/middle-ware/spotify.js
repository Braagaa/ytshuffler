const createError = require('http-errors');
const {getRequestToken, getSearchArtist} = require('../apis/spotify');
const {exceedsRequestSpotify} = require('../utils/errors');
const {adjustProp, filter, map, path, pick, prop, reduce, tap} = require('../utils/func');

const createToken = res => getRequestToken()
	.then(prop('data'))
	.then(tap(({access_token, expires_in}) => {
		res.cookie('SPOT-TOKEN', access_token, {
			expires: new Date(Date.now() + expires_in * 1000),
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true
		});
	}))
	.then(prop('access_token'));

const getArtistPictures = async (req, res, next) => {
	try { 
		let spotifyAccessToken = req.cookies['SPOT-TOKEN'];
		const artists = req.query.artists.split(',').slice(0, 20);

		if (!spotifyAccessToken) {
			spotifyAccessToken = await createToken(res);
		};

		const imagesRequest = Promise.all(artists
			.map(getSearchArtist(spotifyAccessToken)))
			.then(map(path('data.artists.items.0')))
			.then(filter(artist => artist && artist.images.length > 0))
			.then(map(pick('name,images')))
			.then(map(adjustProp('images', reduce(
				(acc, artist) => artist.width < acc.width && artist.width >= 50 
					? artist : acc,
				{width: Number.POSITIVE_INFINITY}
			))))
			.then(map(pick('name,images.url')))
			.then(artists => {
				req.artists = artists;
				next();
			})
			.catch(exceedsRequestSpotify(res, next))
			.catch(next);
	} catch(e) {
		next(e);
	}
};

module.exports = {
	createToken,
	getArtistPictures
};
