import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow, mount} from 'enzyme';
import {act} from '@testing-library/react';

import {Duration} from '../components/Duration';
import {ChannelTitle} from '../components/Player/style';
import Slider from 'react-input-slider';

Enzyme.configure({adapter: new Adapter()});

const createPlayer = spy => ({
	playingCurrent: {duration: 'PT15M31S'},
	YTPlayer: {getCurrentTime: spy, getDuration: () => 3}
});
const findDisplay = wrapper => wrapper.find(ChannelTitle);

jest.useFakeTimers();

it('Should display the proper duration.', () => {
	const getCurrentTimeMock = jest.fn(x => 300);
	const wrapper = mount(<Duration
		player={createPlayer(getCurrentTimeMock)}
	/>);

	let durationDisplay = findDisplay(wrapper);
	expect(durationDisplay.text()).toBe('0:00 / 15:31');

	act(() => jest.advanceTimersByTime(250));
	durationDisplay = findDisplay(wrapper);
	expect(durationDisplay.text()).toBe('5:00 / 15:31');
});

it('Duration should change during click.', () => {
	const wrapper = shallow(<Duration
		player={{
			playingCurrent: {duration: 'PT15M31S'},
			YTPlayer: {seekTo: jest.fn(), getDuration: jest.fn()}
		}}
	/>);

	const slider = wrapper.find(Slider);
	slider.simulate('change', {x: 300000});
	expect(findDisplay(wrapper).text()).toBe('5:00 / 15:31');
});

it('Duration time should be changing every 250ms.', () => {
	const getCurrentTimeMock = jest.fn(x => 1);
	const wrapper = mount(<Duration 
		player={createPlayer(getCurrentTimeMock)}
	/>);

	act(() => jest.advanceTimersByTime(3000));
	expect(getCurrentTimeMock).toHaveBeenCalledTimes(12);
});
