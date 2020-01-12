import React from 'react';
import {connect} from 'react-redux';

import ytDuration from 'youtube-duration-format';
import {playSingle} from '../../actions/player';
import {youtubeURL} from '../../data/url';

import {Wrapper, Img, ButtonsWrapper, InfoWrapper, Info, Artist, Duration, SongButton, LinkSongButton} from './styles';
import main from '../../style/main';

const mapStateToProps = () => ({});
const mapDispatchToProps = {playSingle};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {channelTitle, youtubeId, title, artist, duration, thumbnail_url} = props;
	const {playSingle} = props;

	const onPlay = e => {
		playSingle({
			channelTitle,
			youtubeId,
			title,
			artist,
			thumbnail_url, 
			duration
		});
	};

	return(
		<li>
			<Wrapper>
				<Img src={thumbnail_url} alt={title}/>
				<InfoWrapper>
					<div>
						<Info>{title}</Info>
						<Artist>{artist}</Artist>
					</div>
				</InfoWrapper>
				<ButtonsWrapper>
					<SongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
						onClick={onPlay}
					>
						Play
					</SongButton>
					<LinkSongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
						href={`${youtubeURL.paths.watch}${youtubeId}`}
						target="_blank"
					>
						Info
					</LinkSongButton>
				</ButtonsWrapper>
				<Duration>{ytDuration(duration)}</Duration>
			</Wrapper>
		</li>
	);
}); 
