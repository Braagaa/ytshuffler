import React from 'react';

import {Wrapper, Img, ButtonsWrapper, InfoWrapper, Info, Artist, Duration, SongButton} from './styles';
import main from '../../style/main';

export default function(props) {
	const {snippet} = props;
	const {contentDetails} = props;
	const {snippet: {thumbnails}} = props;
	const [artist, song] = snippet.title.split('-')
		.map(str => str.trim());

	return(
		<li>
			<Wrapper>
				<Img src={thumbnails.default.url} alt={snippet.title}/>
				<InfoWrapper>
					<Info>{song}</Info>
					<Artist>{artist}</Artist>
				</InfoWrapper>
				<ButtonsWrapper>
					<SongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
					>
							Info
					</SongButton>
					<SongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
					>
							Delete
					</SongButton>
				</ButtonsWrapper>
				<Duration>{contentDetails.duration}</Duration>
			</Wrapper>
		</li>
	);
}; 
