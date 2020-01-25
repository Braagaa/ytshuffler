const {Schema, model, Types: {ObjectId: toObjectId}} = require('mongoose');
const {songSchema} = require('./Song');
const {userSchema} = require('./User');
const {errorIfNull} = require('../utils/errors');
const {frontEndFields} = require('../utils/queries');
const {tap, prop} = require('../utils/func');

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
	updatedOn: {
		type: Date,
		default: Date.now
	},
	users: [{
		_id: false,
		id: ObjectId,
		playmode: String,
		isFavourite: {
			type: Boolean,
			default: false
		},
		subscribedOn: {
			type: Date,
			default: Date.now
		}
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
}, {collation: {locale: 'en', strength: 1}});

const pageLimitQuery = (skip, prop) => ({$ceil: {$divide: [prop, skip]}});
const paginationQuery = (page, pageLimit, countProp) => [
	{$count: countProp},
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
];

const sortObject = {
	alphabetical: {title: 1},
	updated: {updatedOn: -1},
	newest: {'users.subscribedOn': -1},
	oldest: {'users.subscribedOn': 1}
};
channelSchema.static('allChannelsForUser', function(user, page = 1, skip = 50, text, favourites = false) {
	const pageLimit = pageLimitQuery(skip, '$totalChannels');
	const textObj = text ? {title: new RegExp(text, 'i')} : {};
	const favouritesObj = favourites === 'true' ? {'users.isFavourite': true} : {};
	const order = sortObject[user.settings.channelOrder] 
		|| sortObject.alphabetical;

	return Channel.aggregate([
		{$match: {'users.id': toObjectId(user.id), ...textObj, ...favouritesObj}},
		{
			$facet: {
				metaData: paginationQuery(page, pageLimit, 'totalChannels'),
				channels: [
					{$unwind: '$users'},
					{$match: {'users.id': toObjectId(user.id)}},
					{$sort: order},
					{$skip: skip * (page - 1)},
					{$limit: skip},
					{$addFields: {
						playmode: '$users.playmode',
						isFavourite: '$users.isFavourite',
						songs: {
							$objectToArray: '$playlists'
						},
					}},
					{$addFields: {
						songs: {
							$reduce: {
								input: '$songs',
								initialValue: '',
								in: {
									$cond: {
										if: {$eq: ['$$this.k', '$playmode']},
										then: '$$this.v',
										else: '$$value'
									}
								}
							}
						}
					}},
					{$project: {
						users: 0,
						playlists: 0
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

channelSchema.static('findAllSongs', function(user) {
	return Channel.aggregate([
		{$match: {'users.id': toObjectId(user.id)}},
		{$addFields: {
			userIndex: {$indexOfArray: ['$users.id', toObjectId(user.id)]},
			playlistsArr: {$objectToArray: '$playlists'}
		}},
		{$addFields: {
			user: {$arrayElemAt: ['$users', '$userIndex']}
		}},
		{$addFields: {
			playlist: {$reduce: {
				input: '$playlistsArr',
				initialValue: {},
				in: {
					$cond: {
						if: {$eq: ['$$this.k', '$user.playmode']},
						then: '$$this.v',
						else: '$$value'
					}
				}
			}
		}}},
		{$set: {'playlist.channelTitle': '$title'}},
		{$group: {_id: null, s: {$push: '$playlist'}}},
		{$project: {_id: 0, songs: {$reduce: {
			input: '$s',
			initialValue: [],
			in: {$concatArrays: ['$$value', '$$this']}
		}}}}
	])
		.then(data => data[0]);
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
			users: {$elemMatch: {id: user._id}},
			updatedOn: 1
		}
	)
		.then(channel => channel ? frontEndFields(channel) : channel);
});

channelSchema.static('findOneChannelForUpdate', function(filter) {
	return Channel.findOne(
		filter,
		{
			title: 1,
			totalVideoCounts: 1,
			youtubeId: 1,
			playlists: 1,
			updatedOn: 1
		}
	);
});

channelSchema.static('updateChannelPlaylist', function(channel, channelUser) {
	const {playmode} = channelUser;
	return Channel.findOneAndUpdate(
		{_id: channel._id, 'users.id': channelUser.id},
		{
			totalVideoCounts: channel.totalVideoCounts, 
			[`playlists.${playmode}`]: channel.playlists[playmode],
			$set: {'users.$.playmode': playmode},
			updatedOn: channel.updatedOn
		},
		{
			new: true,
			fields: {
				youtubeId: 1,
				title: 1,
				thumbnail_url: 1,
				users: {$elemMatch: {id: channelUser.id}},
				topics: 1,
				playlists: 1,
				updatedOn: 1
			}
		}
	)
		.then(frontEndFields);
});

channelSchema.static('deleteUserInChannels', function(user) {
	return Channel.updateMany(
		{'users.id': user.id},
		{$pull: {users: {id: user.id}}}
	)
		.then(() => Channel.deleteMany({users: {$size: 0}}));
});

channelSchema.static('deleteUserInChannel', function(id, user) {
	return Channel.findOneAndUpdate(
		{_id: id, 'users.id': user.id},
		{$pull: {users: {id: user.id}}},
		{new: true}
	)
		.then(channel => {
			if (channel.users.length === 0) {
				return Channel.findByIdAndRemove(id);
			}
			return channel;
		})
		.then(errorIfNull(404, 'Channel or user cannot be found.'));
});

channelSchema.static('findChannelsForUpdate', function(user) {
	return Channel.aggregate([
		{$match: {'users.id': toObjectId(user.id)}},
		{$addFields: {
			userIndex: {$indexOfArray: ['$users.id', toObjectId(user.id)]},
			temp: {$objectToArray: '$totalVideoCounts'}
		}},
		{$addFields: {
			user: {$arrayElemAt: ['$users', '$userIndex']},
		}},
		{$addFields: {
			playmode: '$user.playmode',
			videoCount: {$reduce: {
				input: '$temp',
				initialValue: {},
				in: {
					$cond: {
						if: {$eq: ['$$this.k', '$user.playmode']},
						then: '$$this.v',
						else: '$$value'
					}
				}
			}
		}}},
		{$project: {youtubeId: 1, title: 1, playmode: 1, videoCount: 1}}
	]);
});

channelSchema.static('updateManyChannels', function(channels) {
	const toBulkWrite = channels
		.map(({_id, playmode, videoCount, videos, updatedOn}) => ({
			updateOne: {
				filter: {_id},
				update: {
					[`totalVideoCounts.${playmode}`]: videoCount,
					[`playlists.${playmode}`]: videos,
					updatedOn
				}
			}
		}));
	return Channel.bulkWrite(toBulkWrite);
});

const playlistQuery = user => [
		{$match: {'users.id': toObjectId(user.id)}},
		{$unwind: '$users'},
		{$match: {'users.id': toObjectId(user.id)}},
		{$addFields: {playlist: {$objectToArray: '$playlists'}}},
		{$addFields: {playlist: {$reduce: {
			input: '$playlist',
			initialValue: null,
			in: {$cond: {
				if: {$eq: ['$$this.k', '$users.playmode']},
				then: '$$this.v',
				else: '$$value'
			}}
		}}}},
		{$set: {'playlist.channelTitle': '$title'}},
];
const filterPlaylistQuery = 
	{$addFields: {playlist: {$filter: {
		input: '$playlist',
		as: 'song',
		cond: {$in: ['$topics', '$$song.topics']}
	}}}};

channelSchema.static('getGenres', function(user) {
	return Channel.aggregate([
		...playlistQuery(user),
		{$unwind: '$topics'},
		filterPlaylistQuery,
		{$unwind: '$playlist'},
		{$group: {_id: '$topics', count: {$sum: 1}}},
		{$project: {_id: 0, genre: '$_id', count: 1}}
	]);
});

channelSchema.static('getGenrePlaylists', function(user, genres = '') {
	return Channel.aggregate([
		...playlistQuery(user),
		{$unwind: '$topics'},
		{$match: {$expr: {$in: ['$topics', genres.split(',')]}}},
		filterPlaylistQuery,
		{$unwind: '$playlist'},
		{$group: {_id: '$topics', playlist: {$push: '$playlist'}}},
		{$project: {_id: 0, playlist: 1, genre: '$_id'}}
	]);
});

channelSchema.static('getArtistsPlaylist', function(user, page = 1, skip = 50, text) {
	const pageLimit = pageLimitQuery(skip, '$totalArtists');
	const textObj = text ? 
		{$match: {'playlist.artist': new RegExp(text, 'i')}} :
		{$addFields: {nomatch: true}};

	return Channel.aggregate([
		...playlistQuery(user),
		{$unwind: '$playlist'},
		textObj,
		{$addFields: {'playlist.artist': {$split: ['$playlist.artist', ' - Topic']}}},
		{$addFields: {'playlist.artist': {$arrayElemAt: ['$playlist.artist', 0]}}},
		{$group: {_id: '$playlist.artist', playlist: {$push: '$playlist'}}},
		{$sort: {_id: 1}},
		{$facet: {
			metaData: paginationQuery(page, pageLimit, 'totalArtists'),
			artists: [
				{$skip: skip * (page - 1)},
				{$limit: skip},
				{$project: {
				_id: 0,
				artist: '$_id',
				playlist: 1
			}}],
		}},
	])
		.then(data => ({
			metaData: data[0].metaData[0] || {},
			artists: data[0].artists
		}));
});

channelSchema.static('getFavouriteChannelSongs', function(user) {
	return Channel.aggregate([
		{$match: {'users.id': toObjectId(user.id), 'users.isFavourite': true}},
		{$unwind: '$users'},
		{$match: {'users.id': toObjectId(user.id)}},
		{$addFields: {'playlists': {$objectToArray: '$playlists'}}},
		{$unwind: '$playlists'},
		{$match: {$expr: {$eq: ['$playlists.k', '$users.playmode']}}},
		{$unwind: '$playlists.v'},
		{$group: {_id: null, songs: {$push: '$playlists.v'}}},
		{$project: {_id: 0}}
	])
		.then(prop('0'));
});

channelSchema.index({title: 1});

const Channel = model('Channel', channelSchema);

module.exports = Channel;
