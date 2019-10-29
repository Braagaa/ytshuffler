import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/Headers';
import RadioGroup from '../../components/RadioGroup';
import SongList from '../../components/SongList';
import Loaders from '../../components/Loaders';

import {getChannel, getUserVideoInfo} from '../../apis/shuffler';
import {fetching, fetchClear} from '../../actions/fetching';
import {isEmpty} from '../../utils/func';
import main from '../../style/main';

const Loader = Loaders();
const radioButtons = [
	['date', 'Most Recent Songs'],
	['viewCount', 'Most Viewed Songs'],
];

const songsAddedHint = 'Selects how songs are selected for this channel. Either by the most recently uploaded or the most viewed. The top 100 songs are added to the list.';

const mapStateToProps = dataStore => ({
	channel: dataStore.fetching.channel || {},
	user: dataStore.fetching.user || {},
});
const mapDispatchToProps = {fetching, fetchClear};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {fetching, fetchClear, channel, user} = props;
	const {id} = props.match.params;

	const onChange = e => {
		
	};

	useEffect(() => {
		fetching(getChannel, 'channel', id)
			.then(({_id}) => fetching(getUserVideoInfo, 'user', _id));

		return () => fetchClear();
	}, [fetching, fetchClear, id]);

	return(
		<Loader 
			isLoading={isEmpty(user)} 
			fill={main.colors.color1}
			lm={'5em'}
		>
			<div>
				<Header>{channel.title}</Header>
				<form>
					<RadioGroup 
						title="Play Mode"
						hint={songsAddedHint}
						name="playmode"
						values={radioButtons}
						checked={user.playmode}
						onChange={onChange}
					/>
				</form>
				<SongList songs={channel.songs || []}/>
			</div>
		</Loader>
	);
}); 
