import React from 'react';
import {connect} from 'react-redux';

import {ReactComponent as Forward} from '../../imgs/forward-button.svg';
import {ReactComponent as PlayButton} from '../../imgs/play-button.svg';
import {ReactComponent as PauseButton} from '../../imgs/pause-button.svg';
import {ReactComponent as StopButton} from '../../imgs/stop-button.svg';
import {ReactComponent as MusicIcon} from '../../imgs/music-player.svg';
import {ReactComponent as MinimizeIcon} from '../../imgs/minimize.svg';
import {ReactComponent as ShuffleButton} from '../../imgs/shuffle.svg';
import {ConditionalHidden, Conditions} from '../Conditional/';
import Loaders from '../Loaders/';

import main from '../../style/main';
import {
	playVideo, 
	pauseVideo, 
	stopVideo, 
	openPlayer,
	playNext,
	playAllSongs
} from '../../actions/player';

import {
	Wrapper, 
	ImgHolder, 
	SongTitle, 
	Artist, 
	ChannelTitle,
	ButtonsWrapper, 
	ButtonWrapper,
	MinimizeWrapper,
	ExpandWrapper,
	Hide
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

const modeButtonColor = main.colors.color5;

const Loader = Loaders();

const mapStateToProps = storeData => ({
	player: storeData.player
});
const mapDispatchToProps = {
	playVideo,
	pauseVideo,
	stopVideo,
	openPlayer,
	playNext,
	playAllSongs
};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {SHUFFLE, PLAY, PAUSE} = playmodes;
	const {player, playVideo, playNext, pauseVideo, stopVideo, openPlayer, playAllSongs} = props;
	const {playingCurrent} = player;

	const expandOrMinimize = e => {
		if (player.status === 3) {
			return openPlayer(false);
		};
		return openPlayer(!player.isExpanded);
	};

	return(
		<div>
			<Wrapper minimize={player.isExpanded && player.status !== 3}>
				<ImgHolder>
					<ConditionalHidden bool={player.status === 0 || player.status === 3}>
						<Loader isLoading={player.isLoading} fill={main.colors.color3}>
							<MusicIcon fill={main.colors.color3}/>
						</Loader>
						<div id="player"></div>
					</ConditionalHidden>
				</ImgHolder>
				<SongTitle>{playingCurrent.title}</SongTitle>
				<Artist>{playingCurrent.artist}</Artist>
				<ChannelTitle>{playingCurrent.channelTitle}</ChannelTitle>
				<ButtonsWrapper>
					<MinimizeWrapper onClick={expandOrMinimize}>
						<MinimizeIcon fill={modeButtonColor}/>
					</MinimizeWrapper>
					<MinimizeWrapper>
						<StopButton 
							onClick={stopVideo} 
							fill={modeButtonColor}
						/>
					</MinimizeWrapper>
					<ButtonWrapper>
						<Conditions bools={[
								player.status === 0, 
								player.status === 1
						]}>
							<SHUFFLE.component onClick={playAllSongs} fill={modeButtonColor}/>
							<PAUSE.component onClick={pauseVideo} fill={modeButtonColor}/>
							<PLAY.component onClick={playVideo} fill={modeButtonColor}/>
						</Conditions>
					</ButtonWrapper>
					<ButtonWrapper>
						<Forward fill={modeButtonColor} onClick={playNext}/>
					</ButtonWrapper>
				</ButtonsWrapper>
			</Wrapper>
			<ExpandWrapper minimize={player.isExpanded && player.status !== 3}>
				<ButtonWrapper onClick={expandOrMinimize}>
					<MusicIcon fill={main.colors.color6}/>
				</ButtonWrapper>
			</ExpandWrapper>
		</div>
	);
}); 
