import React from 'react';
import {connect} from 'react-redux';
import Slider from 'react-input-slider';
import main from '../../style/main';
import {setVolume} from '../../actions/player';

import VolumeIcon from './VolumeIcon';
import {Wrapper} from './style';

const {colors: {purple}} = main;

const mapStateToProps = storeData => ({
	player: storeData.player
});
const mapDispatchToProps = {setVolume};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const Volume = connectFunction(function({player, setVolume}) {
	const {volume, isMuted} = player;
	const onChange = ({x}) => setVolume(x);

	return (
		<Wrapper>
			<VolumeIcon/>
			<Slider
				axis="x"
				xmin={0}
				xmax={100}
				xstep={1}
				x={isMuted ? 0 : volume}
				onChange={onChange}
				styles={{
					track: {
						height: '3px',
						width: '30%',
						backgroundColor: 'black',
						display: 'block',
						marginLeft: '10px',
						cursor: 'pointer'
					},
					thumb: {
						height: '13px',
						width: '13px',
						bottom: '5px',
						right: '8px',
						backgroundColor: purple
					},
					active: {
						backgroundColor: purple
					}
				}}
			/>
		</Wrapper>
    );
});

export default Volume;
