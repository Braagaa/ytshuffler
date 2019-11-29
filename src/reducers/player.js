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
	CLEAR,
	START_LOADING,
	ERROR
} from '../actions/player';


const statuses = {
	unstarted: -1,
	stop: 0,
	play: 1,
	pause: 2,
	error: 3
};

const defaultState = {
	type: 'STOP',
	status: statuses.stop,
	playlist: null,
	isExpanded: false,
	isLoading: false,
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
				status: statuses.unstarted,
				playlist: video,
				playingCurrent: video,
				isExpanded: true,
				isLoading: false,
				YTPlayer: state.YTPlayer
			};
		case PLAY_LIST:
			randomVideo = randomNth(videos);
			YTPlayer.loadVideoById(randomVideo.youtubeId);
			return {
				type: 'LIST',
				status: statuses.unstarted,
				playlist: videos,
				playingCurrent: randomVideo,
				isExpanded: true,
				isLoading: false,
				YTPlayer: state.YTPlayer
			};
		case PLAY_NEXT:
			if (state.status === statuses.stop) return state;

			if (state.type === 'SINGLE') {
				YTPlayer.stopVideo();
				return {
					...defaultState,
					isExpanded: state.isExpanded,
					YTPlayer: state.YTPlayer,
				};
			}

			randomVideo = randomNth(playlist);
			YTPlayer.loadVideoById(randomVideo.youtubeId);
			return {
				...state,
				status: statuses.unstarted,
				playingCurrent: randomVideo
			};
		case PLAY:
			YTPlayer.playVideo();
			return {
				...state,
				status: statuses.play
			};
		case PAUSE:
			if (state.status === statuses.unstarted) {
				YTPlayer.playVideo();
				return {
					...state,
					status: statuses.play
				};
			};
			YTPlayer.pauseVideo();
			return {
				...state,
				status: statuses.pause
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
		case START_LOADING:
			return {
				...state,
				isLoading: true
			};
		case ERROR:
			return {
				...state,
				status: statuses.error
			};
		case CLEAR:
			return defaultState;
		default:
			return state;
	}
};
