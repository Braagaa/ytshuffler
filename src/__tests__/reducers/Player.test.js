import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import {Provider} from 'react-redux';

import Player, {statuses} from '../../reducers/Player';
import {
	CREATE_PLAYER,
	PLAY_SINGLE,
	PLAY_LIST,
	PLAY_NEXT,
	PLAY,
	PAUSE,
	STOP,
	SET_VOLUME,
	TOGGLE_MUTE,
	EXPAND,
	START_LOADING,
	ERROR,
	CLEAR
} from '../../actions/Player';

Enzyme.configure({adapter: new Adapter()});

let initialState;
const videos = [{youtubeId: 'a1b23c'}, {youtubeId: '123abc'}];
const createAction = (type, payload = {}) => ({type, payload});
const hasYoutubeId = () => expect.objectContaining({youtubeId: expect.any(String)});
const stringify = obj => JSON.stringify(obj);

const assertCalled = (state, fn, count = 1) => expect(
	state.YTPlayer[fn].mock.calls.length
)
	.toEqual(count);

class State {
	constructor(props) {
		this.state = {
			type: 'STOP',
			status: statuses.stop,
			playlist: null,
			isExpanded: false,
			isLoading: false,
			playingCurrent: {},
			volume: 100,
			isMuted: false,
			YTPlayer: null,
			...props
		};
		return this;
	};

	YTPlayer = {
		loadVideoById: jest.fn(),
		setSize: jest.fn(),
		setVolume: jest.fn(),
		stopVideo: jest.fn(),
		playVideo: jest.fn(),
		pauseVideo: jest.fn(),
		mute: jest.fn(),
		unMute: jest.fn(),
		setVolume: jest.fn(),
	};

	addYTPlayer() {
		this.state = {
			...this.state, 
			YTPlayer: this.YTPlayer
		};
		return this;
	};

	mergeYTPlayerProp(props) {
		this.state.YTPlayer = {
			...this.state.YTPlayer,
			...props
		};
		return this;
	}

	mergeProps(props) {
		this.state = {
			...this.state,
			...props
		};
		return this;
	};

	getState() {
		return this.state;
	};

	toJSON() {
		return JSON.stringify(this.state);
	}
};

beforeEach(() => {
	const YTPlayer = new State().YTPlayer;
	initialState = Player(undefined, {type: CREATE_PLAYER, payload: {YTPlayer}});
});

it('CREATE_PLAYER', () => {
	const state = new State().addYTPlayer();
	expect(stringify(initialState)).toEqual(state.toJSON());
});

it('PLAY_SINGLE', () => {
	const action = createAction(PLAY_SINGLE, {video: videos[0]});
	const result = {
		type: 'SINGLE', 
		status: statuses.unstarted,
		playlist: videos[0],
		playingCurrent: videos[0],
		isExpanded: true,
	};
	expect(Player(initialState, action)).toMatchObject(result);
	assertCalled(initialState, 'loadVideoById');
	assertCalled(initialState, 'setSize');
	assertCalled(initialState, 'setVolume');
});

it('PLAY_LIST', () => {
	const action = createAction(PLAY_LIST, {videos});
	const result = {
		type: 'LIST',
		status: statuses.unstarted,
		playlist: videos,
		playingCurrent: hasYoutubeId(),
		isExpanded: true
	};
	expect(Player(initialState, action)).toMatchObject(result);
	assertCalled(initialState, 'loadVideoById');
	assertCalled(initialState, 'setSize');
	assertCalled(initialState, 'setVolume');
});

it('PLAY_NEXT', () => {
	const action = createAction(PLAY_NEXT);
	const state = new State({playlist: videos})
		.addYTPlayer();
	expect(Player(state.getState(), action)).toEqual(state.getState());

	let result = {
		playlist: null,
		status: statuses.stop,
		type: 'STOP'
	};
	state.mergeProps({type: 'SINGLE', status: statuses.play});
	expect(Player(state.getState(), action)).toMatchObject(result);
	assertCalled(state.getState(), 'stopVideo');

	result = {
		status: statuses.unstarted,
		playingCurrent: hasYoutubeId()
	};
	state.mergeProps({type: 'LIST'});
	expect(Player(state.getState(), action)).toMatchObject(result);
	assertCalled(state.getState(), 'loadVideoById');
});

it('PLAY', () => {
	const action = createAction(PLAY);
	const result = {
		status: statuses.play
	};

	expect(Player(initialState, action)).toMatchObject(result);
	assertCalled(initialState, 'playVideo');
});

it('PAUSE', () => {
	const action = createAction(PAUSE);
	const state = new State({status: statuses.unstarted}).addYTPlayer();
	expect(Player(state.getState(), action)).toMatchObject({status: statuses.play});
	assertCalled(state.getState(), 'playVideo');

	state.mergeProps({status: statuses.play});
	expect(Player(state.getState(), action)).toMatchObject({status: statuses.pause});
	assertCalled(state.getState(), 'pauseVideo');
});

it('STOP', () => {
	const action = createAction(STOP);
	const state = new State({status: statuses.play, type: 'LIST'}).addYTPlayer();
	expect(stringify(Player(state.getState(), action)))
		.toEqual(stringify(initialState));

	state.mergeProps({status: statuses.pause});
	expect(stringify(Player(state.getState(), action)))
		.toEqual(stringify(initialState));
	assertCalled(state.getState(), 'stopVideo', 2);
});

it('SET_VOLUME', () => {
	const action = createAction(SET_VOLUME, {value: 50});

	expect(Player(initialState, action)).toMatchObject({volume: 50});

	assertCalled(initialState, 'setVolume');
	assertCalled(initialState, 'unMute');
});

it('TOGGLE_MUTE', () => {
	const action = createAction(TOGGLE_MUTE);
	const state = new State().addYTPlayer();

	state.mergeYTPlayerProp({isMuted: jest.fn(() => false)});
	expect(Player(state.getState(), action)).toMatchObject({isMuted: true});
	assertCalled(state.getState(), 'isMuted');
	assertCalled(state.getState(), 'mute');
	
	state.mergeYTPlayerProp({isMuted: jest.fn(() => true)});
	expect(Player(state.getState(), action)).toMatchObject({isMuted: false});
	assertCalled(state.getState(), 'isMuted');
	assertCalled(state.getState(), 'unMute');
});

it('EXPAND', () => {
	const expanded = {isExpanded: true};
	const notExpanded = {isExpanded: false};

	expect(Player(initialState, createAction(EXPAND, notExpanded)))
		.toMatchObject(notExpanded);
	expect(Player(initialState, createAction(EXPAND, expanded)))
		.toMatchObject(expanded);
	assertCalled(initialState, 'setSize', 2);
});

it('START_LOADING', () => {
	const action = createAction(START_LOADING);
	const result = {
		isExpanded: true,
		isLoading: true
	};

	expect(Player(initialState, action)).toMatchObject(result);
});

it('ERROR', () => {
	const action = createAction(ERROR, {error: new Error('Error Found.')});
	expect(Player(initialState, action)).toMatchObject({status: statuses.error});
});

it('CLEAR', () => {
	const action = createAction(CLEAR);
	const result = new State().getState();
	expect(Player(initialState, action)).toEqual(result);
});
