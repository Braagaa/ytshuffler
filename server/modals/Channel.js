const {Schema, model} = require('mongoose');
const {songSchema} = require('./Song');
const {getChannels} = require('../apis/youtube-data');

const channelSchema = new Schema({
	youtubeId: {
		type: String,
		unique: true,
		required: true
	},
	etag: String,
	title: {
		type: String,
		required: true
	},
	thumbnail_url: {
		type: String,
		required: true
	},
	videoCount: Number,
	topicIds: [String],
	songs: [songSchema]
});

const Channel = model('Channel', channelSchema);

module.exports = Channel;
