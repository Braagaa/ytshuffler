const {Schema, model} = require('mongoose');
const getTopics = require('../utils/getTopics');

const songSchema = new Schema({
	youtubeId: {
		type: String,
		require: true
	},
	title: String,
	thumbnail_url: String,
	duration: String,
	topics: [String]
});

songSchema.pre('save', function(next) {
	this.topics = getTopics(this.topics);
	next();
});

const Song = model('Song', songSchema);

module.exports = {songSchema, Song};
