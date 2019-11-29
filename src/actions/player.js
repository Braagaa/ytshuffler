import {getAllSongs} from '../apis/shuffler';

export const CREATE_PLAYER = 'CREATE_PLAYER';
export const PLAY_SINGLE = 'PLAY_SINGLE';
export const PLAY_LIST = 'PLAY_LIST';
export const PLAY = 'PLAY';
export const PLAY_NEXT = 'PLAY_NEXT';
export const STOP = 'STOP';
export const PAUSE = 'PAUSE'
export const CLEAR = 'CLEAR';
export const EXPAND = 'EXPAND';
export const START_LOADING = 'START_LOADING';
export const ERROR = 'ERROR';

export const playSingle = video => ({
	type: PLAY_SINGLE,
	payload: {video}
});

export const playList = videos => ({
	type: PLAY_LIST,
	payload: {videos}
});

export const openPlayer = (bool = true) => ({
	type: EXPAND,
	payload: {isExpanded: bool}
});

export const sendYTPlayer = YTPlayer => ({
	type: CREATE_PLAYER,
	payload: {YTPlayer}
});

export const foundError = e => ({
	type: ERROR,
	payload: {error: e.response.data.error}
});

const action = action => () => ({type: action});

export const playVideo = action(PLAY);
export const playNext = action(PLAY_NEXT);
export const stopVideo = action(STOP);
export const pauseVideo = action(PAUSE);
export const clearPlayer = action(CLEAR);
export const startLoading = action(START_LOADING);

export const playAllSongs = () => dispatch => {
	dispatch(startLoading());
	return getAllSongs()
		.then(res => res.data.songs)
		.then(songs => dispatch(playList(songs)))
		.catch(e => dispatch(foundError(e)));
};

const checkState = (state, e) => e.data === window.YT.PlayerState[state];

export const createYTPlayer = () => dispatch => {
	const tag = document.createElement('script');
	tag.src = 'https://www.youtube.com/iframe_api';

	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	const onStateChange = e => {
		if (checkState('ENDED', e)) {
			return dispatch(playNext());
		}

		if (checkState('PAUSED', e)) {
			return dispatch(pauseVideo());
		}

		if (checkState('PLAYING', e)) {
			return dispatch(playVideo());
		}
	};

	const onError = e => console.error(e.data);

	tag.onload = function() {
		window.onYouTubeIframeAPIReady = function() {
			const player = new window.YT.Player('player', {
				height: '174',
				width: '174',
				playerVars: {
					origin: document.location.origin,
					enablejsapi: 1,
					disablekb: 1
				}
			});

			player.addEventListener('onStateChange', onStateChange);
			player.addEventListener('onError', onError);

			dispatch(sendYTPlayer(player));
		}
	}

	return () => {
	};
};
