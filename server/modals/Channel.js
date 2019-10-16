const {Schema, model} = require('mongoose');
const {songSchema} = require('./Song');
const {userSchema} = require('./User');

const {ObjectId} = Schema.Types;

const channelSchema = new Schema({
	youtubeId: {
		type: String,
		unique: true,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	thumbnail_url: {
		type: String,
		required: true
	},
	etags: {
		date: [],
		viewCount: []
	},
	users: [{
		_id: false,
		id: ObjectId,
		playmode: String
	}],
	topics: [String],
	songs: [songSchema]
});

const Channel = model('Channel', channelSchema);

module.exports = Channel;
