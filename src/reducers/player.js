import {randomNth} from '../utils/random';
import {
	CREATE_PLAYER, 
	PLAY_SINGLE, 
	PLAY_LIST, 
	PLAY, 
	PLAY_NEXT, 
	PAUSE, 
	STOP, 
	EXPAND, 
	CLEAR
} from '../actions/player';

const defaultState = {
	type: 'STOP',
	status: 0,
	playlist: null,
	isExpanded: false,
	isNext: false,
	playingCurrent: {},
	YTPlayer: null
};

export default function playerReducer(state = defaultState, action) {
	const {video, videos} = action.payload || {};
	const {YTPlayer, playlist} = state;
	let randomVideo = {};
	switch(action.type) {
		case CREATE_PLAYER:
			return {
				...state,
				YTPlayer: action.payload.YTPlayer
			};
		case PLAY_SINGLE: 
			YTPlayer.loadVideoById(video.youtubeId);
			return {
				type: 'SINGLE',
				status: 1,
				playlist: video,
				playingCurrent: video,
				isNext: true,
				isExpanded: true,
				YTPlayer: state.YTPlayer
			};
		case PLAY_LIST:
			randomVideo = randomNth(videos);
			YTPlayer.loadVideoById(randomVideo.youtubeId);
			return {
				type: 'LIST',
				status: 1,
				playlist: videos,
				playingCurrent: randomVideo,
				isNext: true,
				isExpanded: true,
				YTPlayer: state.YTPlayer
			};
		case PLAY_NEXT:
			if (state.status === 0) return state;

			if (state.type === 'SINGLE') {
				YTPlayer.stopVideo();
				return {
					...defaultState,
					isExpanded: state.isExpanded,
					YTPlayer: state.YTPlayer
				};
			}

			randomVideo = randomNth(playlist);
			YTPlayer.loadVideoById(randomVideo.youtubeId);
			return {
				...state,
				isNext: true,
				playingCurrent: randomVideo
			};
		case PLAY:
			YTPlayer.playVideo();
			return {
				...state,
				status: 1
			};
		case PAUSE:
			if (state.isNext) {
				return {
					...state,
					status: 2,
					isNext: false
				};
			}
			YTPlayer.pauseVideo();
			return {
				...state,
				status: 2
			};
		case STOP:
			YTPlayer.stopVideo();
			return {
				...defaultState,
				isExpanded: state.isExpanded,
				YTPlayer: state.YTPlayer
			};
		case EXPAND:
			return {
				...state,
				isExpanded: action.payload.isExpanded
			};
		case CLEAR:
			return defaultState;
		default:
			return state;
	}
};
