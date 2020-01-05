const {Channel} = require('../modals');
const {prop} = require('./func');

const ifUserInChannels = (ChannelDB, channels, user) => ChannelDB
	.find({
		youtubeId: {$in: channels.map(prop('id'))},
		'users.id': user.id
	}, {youtubeId: 1});

const frontEndFields = channel => ({
	youtubeId: channel.youtubeId,
	title: channel.title,
	thumbnail_url: channel.thumbnail_url,
	topics: channel.topics,
	playmode: channel.users[0].playmode,
	songs: channel.playlists[channel.users[0].playmode],
	isFavourite: channel.users[0].isFavourite,
	updatedOn: channel.updatedOn
});

module.exports = {
	ifUserInChannels,
	frontEndFields
};
