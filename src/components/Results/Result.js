import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Wrapper, Inner, ChannelImg, Buttons, Button, Link, ListTopicIds} from './styles';
import {youtubeURL} from '../../data/url';
import {createChannel} from '../../apis/shuffler';

import {noDup} from '../../utils/func';
import {setState} from '../../utils/commonEvent';
import {modalMode} from '../../actions/modal';
import {ConditionalLoader} from '../Conditional/';
import main from '../../style/main';

const {colors} = main;

const mapStateToProps = () => ({});
const mapDispatchToProps = {
	modalMode
};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {modalMode} = props;
	const {snippet: data, statistics} = props;
	const {url} = data.thumbnails.medium;
	const topicList = noDup(props.topicDetails.topicIds)
		.map(num => props.topicIds[num])
		.filter(topicId => topicId && topicId !== 'Music');

	const [isInUserChannels, setIsInUserChannels] = useState(false);

	const createChannelHandle = e => {
		modalMode(true, true);
		return createChannel({
			youtubeId: props.id,
			kind: props.kind,
			etag: props.etag,
			title: data.title,
			thumbnail_url: url,
			topics: topicList,
			videoCount: statistics.videoCount
		})
			.then(setState(modalMode, true, false, {
				channelTitle: data.title,
				thumbnail_url: url
			}))
			.then(setState(setIsInUserChannels, true))
			.catch(console.error);
	}

	return (
		<Wrapper>
			<div>
				<ChannelImg src={url} alt={data.title}/>
				<Inner>
					<h4>{data.title}</h4>
					{
						topicList && 
							<ListTopicIds>
								{
									topicList.map(
										topicId => <li key={topicId}>{topicId}</li>
									)
								}	
							</ListTopicIds>
					}
					<p>{`${statistics.videoCount} videos`}</p>
				</Inner>
			</div>
			<Buttons>
				<ConditionalLoader
					color={colors.color3}
					background={colors.color1}
					bool={props.inUserChannels || isInUserChannels}
				>
					<Button>Go to Library</Button>
					<Button onClick={createChannelHandle}>
						Add to Library
					</Button>
				</ConditionalLoader>
				<Link
					href={youtubeURL.channel + props.id}
					color={colors.color3}
					background={colors.color1}
					target="_blank"
				>
					Info
				</Link>
			</Buttons>
		</Wrapper>
	);
});
