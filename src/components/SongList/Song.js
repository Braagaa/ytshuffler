import React from 'react';
import {connect} from 'react-redux';

import {playSingle} from '../../actions/player';

import {Wrapper, Img, ButtonsWrapper, InfoWrapper, Info, Artist, Duration, SongButton} from './styles';
import main from '../../style/main';

const mapStateToProps = () => ({});
const mapDispatchToProps = {playSingle};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {youtubeId, title, artist, duration, thumbnail_url} = props;
	const {playSingle} = props;

	const onPlay = e => {
		playSingle({
			youtubeId,
			title,
			artist,
			thumbnail_url, 
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
					<SongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
					>
						Delete
					</SongButton>
				</ButtonsWrapper>
				<Duration>{duration}</Duration>
			</Wrapper>
		</li>
	);
}); 
