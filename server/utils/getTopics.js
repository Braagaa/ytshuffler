const topicIds = require('../data/youtube-topic-ids');
const {flipObject} = require('./func');

const topicIdsFliped = flipObject(topicIds);
const convert = topicIdList => topicId => topicIdList[topicId];

module.exports = (topicIds = []) => Array.from(new Set(topicIds
	.map(convert(topicIdsFliped))
	.filter(topic => topic && topic !== 'Music')
));
