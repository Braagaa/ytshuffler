const {Schema, model} = require('mongoose');

const songSchema = new Schema({
	youtubeId: {
		type: String,
		unique: true,
		require: true
	},
	etag: String,
	title: String,
	thumbnail_url: String,
	duration: String,
	topicIds: [String]
});

const Song = model('Song', songSchema);

module.exports = {songSchema, Song};
