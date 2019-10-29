import React from 'react';

import {Wrapper, Img, ButtonsWrapper, InfoWrapper, Info, Artist, Duration, SongButton} from './styles';
import main from '../../style/main';

export default function(props) {
	const {title, duration, thumbnail_url} = props;
	const [artist, song] = title.split('-')
		.map(str => str.trim());

	return(
		<li>
			<Wrapper>
				<Img src={thumbnail_url} alt={title}/>
				<InfoWrapper>
					<div>
						<Info>{song}</Info>
						<Artist>{artist}</Artist>
					</div>
				</InfoWrapper>
				<ButtonsWrapper>
					<SongButton 
						bg={main.colors.color3} 
						color={main.colors.color1}
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
}; 
