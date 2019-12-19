import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {playList} from '../../actions/player';

import {ReactComponent as MusicPlayer} from '../../imgs/music-player.svg';
import Conditional, {ConditionalLoader} from '../Conditional/';
import {Wrapper, BodyWrapper, Header, Name, Stats, Pill, Img} from './style';

import {useResize} from '../../hooks/';

const StatsOrNull = Conditional(Stats);

const mapStateToProps = () => ({});
const mapDispatchToProps = {playList};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const ArtistGroup = connectFunction(function(props) {
	const {header, artists, playList} = props;
	const [width,] = useResize();

	const onClick = playlist => e => playList(playlist);

	return (
		<div>
			<Header>{header}</Header>
			{
				artists.map(({artist, playlist, url}) => (
					<BodyWrapper key={playlist[0].artist}>
						<Wrapper f="2">
							<ConditionalLoader bool={url}>
								<Img src={url} alt={artist}/>
								<MusicPlayer fill="white" height="50px" width="50px"/>	
							</ConditionalLoader>
							<Name>{artist}</Name>
						</Wrapper>
						<Wrapper f="1" jc="space-evenly">
							<Pill onClick={onClick(playlist)}>Play</Pill>
							<StatsOrNull bool={width > 600}>Songs: {playlist.length}</StatsOrNull>
							<StatsOrNull bool={width > 768}>{playlist[0].channelTitle}</StatsOrNull>
						</Wrapper>
					</BodyWrapper>
				))
			}
		</div>
	);
});

export default ArtistGroup;

ArtistGroup.propTypes = {
	header: PropTypes.string,
	artists: PropTypes.array
};
ArtistGroup.defaultProps = {
	header: '',
	artists: []
};
