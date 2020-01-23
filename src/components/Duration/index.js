import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ytDuration from 'youtube-duration-format';
import Slider from 'react-input-slider';
import prettyMs from 'pretty-ms';

import main from '../../style/main';
import {ChannelTitle} from '../Player/style';

const {colors: {purple, color3: redish}} = main;

const mapStateToProps = storeData => ({
	player: storeData.player
});
const mapDispatchToProps = {};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const Duration = function({player}) {
	const {playingCurrent, YTPlayer} = player;
	const [currentMs, setCurrentMs] = useState(0);
	const drag = useRef({ms: 0, isDrag: false});

	const maxDuration = ytDuration(playingCurrent.duration);
	const maxDurationMs = Math.ceil(YTPlayer.getDuration() || 0) * 1000;
	const currentDuration = currentMs < 1000 ? 
		'0:00' : prettyMs(currentMs, {
			colonNotation: true, 
			secondsDecimalDigits: 0
		});

	useEffect(() => {
		const interval = setInterval(() => {
			if (drag.current.isDrag) {
				setCurrentMs(drag.current.ms);
			} else {
				setCurrentMs((YTPlayer.getCurrentTime() || 0) * 1000);
			};
		}, 250);

		return () => clearInterval(interval);
	}, [YTPlayer]);

	const onChange = ({x}) => {
		setCurrentMs(x);
		drag.current.ms = x;

		if (drag.current.isDrag) {
			YTPlayer.seekTo(x / 1000, false);
		} else {
			YTPlayer.seekTo(x / 1000, true);
		};
	}

	const onDragStart = e => {
		drag.current.isDrag = true;
	};

	const onDragEnd = e => {
		drag.current.isDrag = false;
		YTPlayer.seekTo(drag.current.ms / 1000, true);
	};

	return (
		<div>
			<Slider
				axis="x"
				xmin={0}
				xmax={maxDurationMs}
				xstep={1000}
				x={currentMs}
				onChange={onChange}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				styles={{
					track: {
						display: 'block',
						width: '174px',
						height: '4px',
						margin: '1em auto',
						backgroundColor: 'black',
						cursor: 'pointer'
					},
					active: {
						backgroundColor: purple
					},
					thumb: {
						borderRadius: 'none',
						width: '3px',
						height: '16px',
						bottom: '6px',
						backgroundColor: redish,
						cursor: 'pointer'
					}
				}}
			/>
			<ChannelTitle>{currentDuration} / {maxDuration}</ChannelTitle>
		</div>
	);
};

export default connectFunction(Duration);

Duration.propTypes = {
	player: PropTypes.object
};
