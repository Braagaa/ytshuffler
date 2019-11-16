const {Schema, model} = require('mongoose');
const getTopics = require('../utils/getTopics');

const songSchema = new Schema({
	youtubeId: {
		type: String,
		require: true
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	artist: {
		type: String,
		default: '',
		trim: true
	},
	thumbnail_url: String,
	duration: String,
	topics: [String]
});

const Song = model('Song', songSchema);

module.exports = {songSchema, Song};
