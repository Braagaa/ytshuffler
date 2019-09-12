import React from 'react';
import {Wrapper, Inner, VideoImg, ChannelImg, Button, ListTopicIds} from './styles';
import main from '../../style/main';

import {noDup} from '../../utils/func';

const {colors} = main;

export default function(props) {
	const {snippet: data} = props;
	const {url} = data.thumbnails.medium;
	const isChannel = props.kind === 'youtube#channel';
	const topicIdList = noDup(props.topicDetails.topicIds)
		.map(num => props.topicIds[num])
		.filter(topicId => topicId && topicId !== 'Music');

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
					{
						topicIdList && 
							<ListTopicIds>
								{
									topicIdList.map(
										topicId => <li key={topicId}>{topicId}</li>
									)
								}	
							</ListTopicIds>
					}
					<p>
						{
							isChannel ? 
								`${props.statistics.videoCount} videos`: 
								`Duration: ${props.duration}`
						}
					</p>
				</Inner>
			</div>
			<Button color={colors.color3}>Add to Library</Button>
		</Wrapper>
	);
};
