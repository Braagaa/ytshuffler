const createError = require('http-errors');
const {Channel} = require('../modals/');
const {getSearchVideos, getVideos, getChannelUpdate} = require('../apis/youtube-data');
const {errorIfNull, castError} = require('../utils/errors');
const getTopics = require('../utils/getTopics');
const {map, asyncMap, splitEvery, flat, method, path} = require('../utils/func');

const maxSongs = process.env.REACT_APP_MAX_NUMBER_SONGS || 100;

const getTitle = youtubeTitle => {
	const [artist, title] = youtubeTitle.split('-');
	return title ? title : artist;
};
const getArtist = (channelTitle, youtubeTitle) => {
	const [artist, title] = youtubeTitle.split('-');
	return title ? artist : channelTitle;
};

const getAllSongs = async (channelId, channelTitle, order) => {
	let searchResults = await getSearchVideos({channelId, order});
	let videos = searchResults.data.items;

	while (videos.length < maxSongs && searchResults.data.nextPageToken) {
		searchResults = await getSearchVideos({
			channelId,
			order,
			pageToken: searchResults.data.nextPageToken
		});
		videos = [...videos, ...searchResults.data.items];
	}

	videos = videos.slice(0, maxSongs)
		.map(path('id.videoId'));

	let videosString = splitEvery(50)(videos)
		.map(method('join', ','));

	videos = await asyncMap(videoIdsString => getVideos({id: videoIdsString}))(videosString);
	videos = flat(videos.map(path('data.items')))
		.map(video => ({
			youtubeId: video.id,
			title: getTitle(video.snippet.title),
			artist: getArtist(channelTitle, video.snippet.title),
			thumbnail_url: video.snippet.thumbnails.default.url,
			duration: video.contentDetails.duration,
			topics: getTopics(video.topicDetails.relevantTopicIds)
		}));

	return videos;
};

const getSongsForUpdate = async (channel, playlist) => {
	const {totalVideoCounts, youtubeId, title, playlists} = channel;

	const channelVideoCount = await getChannelUpdate({id: youtubeId})
		.then(path('data.items.0.statistics.videoCount'));

	let videos = [];
	const playlistCount = totalVideoCounts[playlist];

	if (playlistCount !== parseInt(channelVideoCount)) {
		videos = await getAllSongs(youtubeId, title, playlist);
	} else {
		videos = playlists[playlist];
	};

	return {videos, channelVideoCount};
};

const songsForChannel = async (req, res, next) => {
	try {
		const channel = await Channel.findOneChannelForUpdate({
			youtubeId: req.channel.youtubeId
		});
		const {settings: {playmode: order}} = req.user;

		if (channel) {
			const {videos, channelVideoCount} = await getSongsForUpdate(channel, order);

			req.channel = channel.toObject();
			req.channel.totalVideoCounts[order] = channelVideoCount;
			req.channel.playlists[order] = videos;

			return next();
		};

		const {youtubeId: channelId, title, videoCount} = req.channel;

		let videos = await getAllSongs(channelId, title, order);

		req.channel.playlists = {[order]: videos};
		req.channel.totalVideoCounts = Object.keys(Channel.schema.obj.playlists)
			.reduce((acc, prop) => 
				({...acc, [prop]: prop === order ? videoCount : 0}), {}
			);

		return next();
	} catch(e) {
		console.log(e);
		next(createError(500, 'Cannot create channel.'));
	};
};

const userForChannel = (req, res, next) => {
	const {user, channel} = req;
	if (!user || !channel) {
		return next(createError(422, 'User or channel not found.'));
	}

	req.channelUser = {
		id: user.id,
		playmode: channel.playmode || user.settings.playmode
	};

	return next();
};

const channelUpdate = async (req, res, next) => {
	try {
		const {params: {id, playlist}} = req;
	
		const channel = await Channel.findOneChannelForUpdate({_id: id})
			.then(errorIfNull(404, 'Channel cannot be found.'));
		const {totalVideoCounts, youtubeId, title, playlists} = channel;

		const {videos, channelVideoCount} = await getSongsForUpdate(channel, playlist);

		req.channel = channel;
		req.channel.playmode = playlist;
		req.channel.totalVideoCounts[playlist] = channelVideoCount;
		req.channel.playlists[playlist] = videos;
		
		next();
	} catch(e) {
		next(e);
	}
};

module.exports = {
	songsForChannel,
	userForChannel,
	channelUpdate
};
