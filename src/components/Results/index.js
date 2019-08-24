import React from 'react';
import styled from 'styled-components';
import Result from './Result';

import {search_result_channel, search_result_video, channel_example, video_example} from '../../data';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export default function(props) {
	return (
		<Wrapper>
			<Result 
				{...search_result_channel} 
				videoCount={channel_example.statistics.videoCount}
			/>
			<Result
				{...search_result_video}
				duration={video_example.contentDetails.duration}
			/>
		</Wrapper>
	);
};
