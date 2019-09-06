import React, {useState} from 'react';

import {ReactComponent as Forward} from '../../imgs/forward-button.svg';
import {ReactComponent as PlayButton} from '../../imgs/play-button.svg';
import {ReactComponent as PauseButton} from '../../imgs/pause-button.svg';
import {ReactComponent as StopButton} from '../../imgs/stop-button.svg';
import {ReactComponent as MusicIcon} from '../../imgs/music-player.svg';
import {ReactComponent as MinimizeIcon} from '../../imgs/minimize.svg';
import {ReactComponent as ShuffleButton} from '../../imgs/shuffle.svg';

import {inverseBool} from '../../utils/commonEvent';
import main from '../../style/main';

import {
	Wrapper, 
	ImgHolder, 
	SongTitle, 
	Artist, 
	ButtonsWrapper, 
	ButtonWrapper,
	MinimizeWrapper,
	ExpandWrapper
} from './style';

const createPlaymode = (modes, components) => playmodeObj => {
	return modes.reduce((acc, mode, i) => 
		({...acc, [mode]: {status: i, component: components[i]}}),
		playmodeObj
	);
};

const playmodes = createPlaymode(
	['STOP', 'PLAY', 'PAUSE', 'SHUFFLE'], 
	[StopButton, PlayButton, PauseButton, ShuffleButton]
)({});

export default function(props) {
	const {SHUFFLE, PLAY, PAUSE} = playmodes;
	const modeButtonColor = main.colors.color5;

	const [playmode, setPlaymode] = useState(SHUFFLE);
	const [isExpanded, setIsExpanded] = useState(false);

	const pauseOrPlay = e => 
		setPlaymode(playmode.status === 1 ? PAUSE : PLAY);
	const changeMode = mode => e => setPlaymode(mode);
	const expandOrMinimize = inverseBool(setIsExpanded, isExpanded);

	return(
		<div>
			<Wrapper minimize={isExpanded}>
				<ImgHolder>
					<MusicIcon fill={main.colors.color3}/>
				</ImgHolder>
				<SongTitle>Some Title</SongTitle>
				<Artist>Mc Joe Blow</Artist>
				<ButtonsWrapper>
					<MinimizeWrapper onClick={expandOrMinimize}>
						<MinimizeIcon fill={modeButtonColor}/>
					</MinimizeWrapper>
					{
						playmode.status === 0 || 
						<MinimizeWrapper>
							<StopButton onClick={changeMode(SHUFFLE)} fill={modeButtonColor}/>
						</MinimizeWrapper>
					}
					<ButtonWrapper onClick={pauseOrPlay}>
						<playmode.component fill={modeButtonColor}/>
					</ButtonWrapper>
					<ButtonWrapper>
						<Forward fill={modeButtonColor}/>
					</ButtonWrapper>
				</ButtonsWrapper>
			</Wrapper>
			<ExpandWrapper minimize={isExpanded}>
				<ButtonWrapper onClick={expandOrMinimize}>
					<MusicIcon fill={main.colors.color6}/>
				</ButtonWrapper>
			</ExpandWrapper>
		</div>
	);
}; 
