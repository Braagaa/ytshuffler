const express = require('express');
const {getRequestToken, getSearchArtist} = require('../apis/spotify');
const {getArtistPictures} = require('../middle-ware/spotify');
const {requiredQuery} = require('../middle-ware/validateYoutube');
const {path} = require('../utils/func');

const router = express.Router();

const getImagesMW = [
	requiredQuery('artists'),
	getArtistPictures
];

router.get('/search/artists/images', getImagesMW, (req, res, next) => {
	return res.status(200).json(req.artists);
});

module.exports = router;
