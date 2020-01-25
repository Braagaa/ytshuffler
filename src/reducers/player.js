import {randomNth} from '../utils/random';
import nullYTPlayer from '../utils/nullYTPlayer';
import {
	CREATE_PLAYER, 
	PLAY_SINGLE, 
	PLAY_LIST, 
	PLAY, 
	PLAY_NEXT, 
	PAUSE, 
	STOP, 
	SET_VOLUME,
	TOGGLE_MUTE,
	EXPAND, 
	CLEAR,
	START_LOADING,
	ERROR
} from '../actions/player';

export const statuses = {
	unstarted: -1,
	stop: 0,
	play: 1,
	pause: 2,
	error: 3
};

export const defaultState = {
	type: 'STOP',
	status: statuses.stop,
	playlist: null,
	isExpanded: false,
	isLoading: false,
	playingCurrent: {},
	volume: 100,
	isMuted: false,
	YTPlayer: nullYTPlayer
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
			YTPlayer.setSize(174, 174);
			YTPlayer.setVolume(state.volume);
			return {
				type: 'SINGLE',
				status: statuses.unstarted,
				playlist: video,
				playingCurrent: video,
				isExpanded: true,
				isLoading: false,
				YTPlayer: state.YTPlayer,
				volume: state.volume,
				isMuted: state.isMuted
			};
		case PLAY_LIST:
			randomVideo = randomNth(videos);
			YTPlayer.loadVideoById(randomVideo.youtubeId);
			YTPlayer.setSize(174, 174);
			YTPlayer.setVolume(state.volume);
			return {
				type: 'LIST',
				status: statuses.unstarted,
				playlist: videos,
				playingCurrent: randomVideo,
				isExpanded: true,
				isLoading: false,
				YTPlayer: state.YTPlayer,
				volume: state.volume,
				isMuted: state.isMuted
			};
		case PLAY_NEXT:
			if (state.status === statuses.stop) return state;

			if (state.type === 'SINGLE') {
				YTPlayer.stopVideo();
				return {
					...defaultState,
					isExpanded: state.isExpanded,
					YTPlayer: state.YTPlayer,
					volume: state.volume,
					isMuted: state.isMuted
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
				YTPlayer: state.YTPlayer,
				volume: state.volume,
				isMuted: state.isMuted
			};
		case SET_VOLUME:
			YTPlayer.unMute();
			YTPlayer.setVolume(action.payload.value);
			return {
				...state,
				isMuted: false,
				volume: action.payload.value
			};
		case TOGGLE_MUTE:
			if (YTPlayer.isMuted()) {
				YTPlayer.unMute();
				return {...state, isMuted: false};
			}
			YTPlayer.mute();
			return {...state, isMuted: true};
		case EXPAND:
			if (!action.payload.isExpanded) {
				YTPlayer.setSize(0, 0);
			} else {
				YTPlayer.setSize(174, 174);
			}
			return {
				...state,
				isExpanded: action.payload.isExpanded
			};
		case START_LOADING:
			return {
				...state,
				isLoading: true,
				isExpanded: true
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
