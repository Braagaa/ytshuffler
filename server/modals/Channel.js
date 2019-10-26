const {Schema, model, Types: {ObjectId: toObjectId}} = require('mongoose');
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
						}
					}},
					{
						$project: {
							youtubeId: 1,
							title: 1,
							thumbnail_url: 1,
							topics: 1,
							songs: {
								$filter: {
									input: '$songs',
									as: 'song',
									cond: {
										$in: ['$playmode', '$$song.playmodes']
									}
								}
							}
						}
					}
				]
			}
		}
	])
		.then(data => ({
			metaData: data[0].metaData[0],
			channels: data[0].channels
		}));
});

channelSchema.index({title: 1});

const Channel = model('Channel', channelSchema);

module.exports = Channel;
