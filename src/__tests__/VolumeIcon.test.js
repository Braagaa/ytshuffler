import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';

import {VolumeIcon} from '../components/Volume/VolumeIcon';
import {ReactComponent as Mute} from '../imgs/mute.svg';

Enzyme.configure({adapter: new Adapter()});

const findSecondAirWave = wrapper => wrapper.find('path').at(2);
const findMute = wrapper => wrapper.find(Mute);
//mutated wrapper
const setVolume = (wrapper, volume) => wrapper.setProps({player: {volume}});

it('The SVG volume image should change depending on current volume ranges. [[0], [1, 50], [51, 100]]', () => {
	const wrapper = shallow(<VolumeIcon player={{volume: 100}}/>);
	let secondAirWave = findSecondAirWave(wrapper);
	expect(secondAirWave.prop('fill')).not.toEqual('transparent');

	setVolume(wrapper, 51);
	secondAirWave = findSecondAirWave(wrapper);
	expect(secondAirWave.prop('fill')).not.toEqual('transparent');

	setVolume(wrapper, 50);
	secondAirWave = findSecondAirWave(wrapper);
	expect(secondAirWave.prop('fill')).toEqual('transparent');

	setVolume(wrapper, 1);
	secondAirWave = findSecondAirWave(wrapper);
	expect(secondAirWave.prop('fill')).toEqual('transparent');

	setVolume(wrapper, 0);
	expect(findMute(wrapper).exists()).toBe(true);
});

it('The SVG mute image should display when volume is muted.', () => {
	const wrapper = shallow(<VolumeIcon player={{volume: 100, isMuted: true}}/>);
	expect(findMute(wrapper).exists()).toBe(true);

	setVolume(wrapper, 0);
	expect(findMute(wrapper).exists()).toBe(true);

	wrapper.setProps({player: {volume: 100, isMuted: false}});
	expect(findMute(wrapper).exists()).toBe(false);
});
