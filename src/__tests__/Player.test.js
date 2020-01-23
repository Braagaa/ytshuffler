import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import {statuses} from '../reducers/player';

import {Player} from '../components/Player';
import {Volume} from '../components/Volume';
import Condition, {ConditionalHidden, Conditions} from '../components/Conditional/';
import {
	Wrapper, 
	SongTitle, 
	Artist, 
	ChannelTitle
} from '../components/Player/style';

Enzyme.configure({adapter: new Adapter()});

const importantComponents = state => {
	const wrapper = shallow(<Player/>);
	wrapper.setProps(state);
	return {
		wrapper,
		player: wrapper.find(Wrapper),
		displayOff: wrapper.find(ConditionalHidden),
		button: wrapper.find(Conditions).dive().childAt(0),
		songTitle: wrapper.find(SongTitle),
		artist: wrapper.find(Artist),
		channelTitle: wrapper.find(ChannelTitle),
		volume: wrapper.find('#volume').dive(),
		duration: wrapper.find('#duration').dive()
	};
};

const createPlayer = (status, songNeeded = true) => ({
	player: {
		playingCurrent: songNeeded ? {
			title: 'Life Is Good',
			artist: 'Future',
			channelTitle: 'Rap City'
		} : {}, 
		status, 
		isExpanded: true, 
		isLoading: false
	}
});

it('Correctly loads to inital state.', () => {
	const {player, displayOff, button} = importantComponents();

	expect(player.prop('minimize')).toEqual(true);
	expect(displayOff.prop('bool')).toEqual(true);
	expect(button.name()).toEqual('ForwardRef(SvgShuffle)');
});

it('Correctly loads to play state.', () => {
	const {
		displayOff,
		button, 
		songTitle, 
		artist, 
		channelTitle,
		volume,
		duration
	} = importantComponents(createPlayer(statuses.play));

	expect(displayOff.prop('bool')).toEqual(false);
	expect(button.name()).toEqual('ForwardRef(SvgPauseButton)');
	expect(songTitle.text()).toEqual('Life Is Good');
	expect(artist.text()).toEqual('Future');
	expect(channelTitle.text()).toEqual('Rap City');
	expect(volume.isEmptyRender()).toEqual(false);
	expect(duration.isEmptyRender()).toEqual(false);
});

it('Correctly loads to pause state.', () => {
	const {
		displayOff,
		button, 
		songTitle, 
		artist, 
		channelTitle,
		volume,
		duration
	} = importantComponents(createPlayer(statuses.pause));

	expect(displayOff.prop('bool')).toEqual(false);
	expect(button.name()).toEqual('ForwardRef(SvgPlayButton)');
	expect(songTitle.text()).toEqual('Life Is Good');
	expect(artist.text()).toEqual('Future');
	expect(channelTitle.text()).toEqual('Rap City');
	expect(volume.isEmptyRender()).toEqual(false);
	expect(duration.isEmptyRender()).toEqual(false);
});

it('Correctly loads to stop state.', () => {
	const {
		displayOff,
		button, 
		songTitle, 
		artist, 
		channelTitle,
		volume,
		duration
	} = importantComponents(createPlayer(statuses.stop, false));

	expect(displayOff.prop('bool')).toEqual(true);
	expect(button.name()).toEqual('ForwardRef(SvgShuffle)');
	expect(songTitle.text()).toBeFalsy();
	expect(artist.text()).toBeFalsy();
	expect(channelTitle.text()).toBeFalsy();
	expect(volume.isEmptyRender()).toEqual(true);
	expect(duration.isEmptyRender()).toEqual(true);
});

it('Correctly loads to unstarted state.', () => {
	const {
		displayOff,
		button, 
		songTitle, 
		artist, 
		channelTitle,
		volume,
		duration
	} = importantComponents(createPlayer(statuses.unstarted));

	expect(displayOff.prop('bool')).toEqual(false);
	expect(button.name()).toEqual('ForwardRef(SvgPlayButton)');
	expect(songTitle.text()).toEqual('Life Is Good');
	expect(artist.text()).toEqual('Future');
	expect(channelTitle.text()).toEqual('Rap City');
	expect(volume.isEmptyRender()).toEqual(false);
	expect(duration.isEmptyRender()).toEqual(false);
});

it('Correctly loads to error state.', () => {
	const {
		displayOff,
		button, 
		songTitle, 
		artist, 
		channelTitle,
		volume,
		duration
	} = importantComponents(createPlayer(statuses.error));

	expect(displayOff.prop('bool')).toEqual(true);
	expect(button.name()).toEqual('ForwardRef(SvgPlayButton)');
	expect(songTitle.text()).toEqual('Life Is Good');
	expect(artist.text()).toEqual('Future');
	expect(channelTitle.text()).toEqual('Rap City');
	expect(volume.isEmptyRender()).toEqual(true);
	expect(duration.isEmptyRender()).toEqual(true);
});
