const {Schema, model, Types: {ObjectId: toObjectId}} = require('mongoose');
const {songSchema} = require('./Song');
const {userSchema} = require('./User');
const {errorIfNull} = require('../utils/errors');

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
	users: [{
		_id: false,
		id: ObjectId,
		playmode: String
	}],
	totalVideoCounts: {
		date: {
			type: Number,
			default: 0
		},
		viewCount: {
			type: Number,
			default: 0
		}
	},
	topics: [String],
	playlists: {
		date: [songSchema],
		viewCount: [songSchema]
	}
});

const frontEndFields = channel => ({
	youtubeId: channel.youtubeId,
	title: channel.title,
	thumbnail_url: channel.thumbnail_url,
	topics: channel.topics,
	playmode: channel.users[0].playmode,
	songs: channel.playlists[channel.users[0].playmode]
});

channelSchema.static('allChannelsForUser', function(user, page = 1, skip = 50, text) {
	const pageLimit = {$ceil: {$divide: ['$totalChannels', skip]}};
	const textObj = text ? {title: new RegExp(text, 'i')} : {};
	return Channel.aggregate([
		{$match: {'users.id': toObjectId(user.id), ...textObj}},
		{
			$facet: {
				metaData: [
					{$count: 'totalChannels'},
					{$addFields: {
						page: page,
						pageLimit,
						prevPage: {
							$and: [{$gt: [page, 1]}, {$lte: [page, pageLimit]}]
						},
						nextPage: {
							$and: [{$lt: [page, pageLimit]}, {$gte: [page, 1]}]
						}
					}}
				],
				channels: [
					{$skip: skip * (page - 1)},
					{$limit: skip},
					{$addFields: {
						playmode: {
							$reduce: {
								input: '$users',
								initialValue: '',
								in: {
									$cond: {
										if: ['$$this.id', toObjectId(user.id)],
										then: '$$this.playmode',
										else: '$$value'
									}
								}
							}
						},
						songs: {
							$objectToArray: '$playlists'
						}
					}},
					{$addFields: {
						songs: {
							$reduce: {
								input: '$songs',
								initialValue: '',
								in: {
									$cond: {
										if: ['$$this.k', '$playmode'],
										then: '$$this.v',
										else: '$$value'
									}
								}
							}
						}
					}},
					{$project: {
						users: 0
					}}
				]
			}
		}
	])
		.then(data => ({
			metaData: data[0].metaData[0],
			channels: data[0].channels
		}));
});

channelSchema.static('findOneChannel', function(id, user) {
	return Channel.findOne(
		{_id: id, 'users.id': user._id}, 
		{
			youtubeId: 1,
			title: 1, 
			thumbnail_url: 1,
			topics: 1,
			playlists: 1,
			users: {$elemMatch: {id: user._id}}
		}
	)
		.then(frontEndFields);
});

channelSchema.static('findOneChannelForUpdate', function(id, user) {
	return Channel.findOne(
		{_id: id},
		{
			totalVideoCounts: 1,
			youtubeId: 1,
			playlists: 1
		}
	)
		.then(errorIfNull(404, 'Channel cannot be found.'));
});

channelSchema.static('updateChannelPlaylist', function(channel, channelUser) {
	const {playmode} = channelUser;
	return Channel.findOneAndUpdate(
		{_id: channel.id, 'users.id': channelUser.id},
		{
			totalVideoCounts: channel.totalVideoCounts, 
			[`playlists.${playmode}`]: channel.playlists[playmode],
			$set: {'users.$.playmode': playmode}
		},
		{new: true}
	)
		.then(frontEndFields);
});

channelSchema.index({title: 1});

const Channel = model('Channel', channelSchema);

module.exports = Channel;
