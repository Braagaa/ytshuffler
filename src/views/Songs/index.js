import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/Headers/ChannelHeader';
import {SmallButton} from '../../components/Buttons';
import RadioGroup from '../../components/RadioGroup';
import SongList from '../../components/SongList';
import Loaders from '../../components/Loaders';

import {getChannel, changeChannelPlaylist} from '../../apis/shuffler';
import {fetching, fetchClear} from '../../actions/fetching';
import main from '../../style/main';

const Loader = Loaders();
const radioButtons = [
	['date', 'Most Recent Songs'],
	['viewCount', 'Most Viewed Songs'],
];

const songsAddedHint = 'Selects how songs are selected for this channel. Either by the most recently uploaded or the most viewed. The top 100 songs are added to the list.';

const mapStateToProps = dataStore => ({
	channel: dataStore.fetching.channel || {},
	isLoading: dataStore.fetching.isLoading
});
const mapDispatchToProps = {fetching, fetchClear};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {fetching, fetchClear, channel, isLoading} = props;
	const {id} = props.match.params;

	const onChange = e => {
		window.scrollTo(0, 0);
		fetching(changeChannelPlaylist, 'channel', id, e.target.value);
	};

	useEffect(() => {
		fetching(getChannel, 'channel', id);
		return () => fetchClear();
	}, [fetching, fetchClear, id]);

	return(
		<Loader 
			isLoading={isLoading} 
			fill={main.colors.color1}
			lm={'5em'}
		>
			<div>
				<Header src={channel.thumbnail_url}>
					{channel.title}
				</Header>
				<form>
					<RadioGroup 
						title="Play Mode"
						hint={songsAddedHint}
						name="playmode"
						values={radioButtons}
						checked={channel.playmode}
						onChange={onChange}
					/>
					<SmallButton>Delete Channel</SmallButton>
				</form>
				<SongList songs={channel.songs || []}/>
			</div>
		</Loader>
	);
}); 
