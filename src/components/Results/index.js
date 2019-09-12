import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Result from './Result';

import {flipObject} from '../../utils/func';
import {getYotubeTopicIds} from '../../apis/shuffler';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const isNotSearchResult = item => item.kind !== 'youtube#searchResult';

export default function(props) {
	const [topicIds, setTopicIds] = useState({}); 

	useEffect(() => {
		getYotubeTopicIds()
			.then(res => res.data)
			.then(setTopicIds)
	}, []);

	return (
		<Wrapper>
			{
				props.items
					.filter(isNotSearchResult)
					.map(item => <Result 
						key={item.id} 
						topicIds={flipObject(topicIds)} 
						{...item}
					/>)
			}
		</Wrapper>
	);
};
