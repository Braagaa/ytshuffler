const {Channel} = require('../modals');
const {prop} = require('./func');

const ifUserInChannels = (channels, user) => Channel
	.find({
		youtubeId: {$in: channels.map(prop('id'))},
		'users.id': user.id
	}, {youtubeId: 1});

module.exports = {
	ifUserInChannels
};
