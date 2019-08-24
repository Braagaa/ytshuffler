import React from 'react';
import {Wrapper, Inner, VideoImg, ChannelImg, Button} from './styles';
import main from '../../style/main';

const {colors} = main;

export default function(props) {
	const {snippet: data} = props;
	const {url} = data.thumbnails.medium;
	const isChannel = props.id.channelId;
	return (
		<Wrapper>
			<div>
				{
					isChannel ?
						<ChannelImg src={url} alt={data.title}/> :
						<VideoImg src={url} alt={data.title}/>
				}
				<Inner>
					<h4>{data.title}</h4>
					<p>
						{
							isChannel ? 
								`${props.videoCount} videos`: 
								`Duration: ${props.duration}`
						}
					</p>
				</Inner>
			</div>
			<Button color={colors.color3}>Add to Library</Button>
		</Wrapper>
	);
};
