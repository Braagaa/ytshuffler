import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Result from './Result';

import {flipObject} from '../../utils/func';
import {getYotubeTopicIds} from '../../apis/shuffler';

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const isNotSearchResult = item => item.kind !== 'youtube#searchResult';

const mapStateToProps = storeData => ({
	topicIds: storeData.initialLoad.topicIds
});
const connectFunction = connect(mapStateToProps);

export default connectFunction(function(props) {
	const {topicIds} = props;

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
});
