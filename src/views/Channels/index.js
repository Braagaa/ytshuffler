import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getChannels} from '../../apis/shuffler';
import {initalizePage} from '../../actions/pagination';
import {fetching, fetchClear} from '../../actions/fetching';
import {playList} from '../../actions/player';
import {useMessages} from '../../hooks/';

import Header from '../../components/Headers';
import ChannelList from '../../components/ChannelList';
import Loaders from '../../components/Loaders';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Conditional from '../../components/Conditional';
import Message from '../../components/Message';
import {SmallButton} from '../../components/Buttons';

import mainStyle from '../../style/main';
import {assoc} from '../../utils/func';
import {unauthorized} from '../../utils/auth';

const {colors} = mainStyle;
const Loader = Loaders();
const PaginationOrNull = Conditional(Pagination);
const MessageOrNull = Conditional(Message);
const ButtonOrNull = Conditional(SmallButton);
const channelsPerPage = 50;
const noChannelsMessage = [
	"You have no channels. Why don't you <link>add<link> some?",
	['/search']
];

const mapStateToProps = storeData => ({
	data: storeData.fetching.data || {},
	isLoading: storeData.fetching.isLoading,
	error: storeData.fetching.error,
	page: storeData.pagination.page,
	initalized: storeData.pagination.initalized
});
const mapDispatchToProps = {initalizePage, fetching, fetchClear, playList};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {data, isLoading, page, initalized} = props;
	const {initalizePage, fetching, fetchClear, playList} = props;
	const {metaData} = data;

	const [messageObj, setMessage] = useMessages(false);

	const checkIfNoChannels = (message, links) => data => {
		if (data.channels.length === 0) setMessage(message, links);
		return data;
	};
	
	useEffect(() => {
		fetching(getChannels, 'data', {page: 1, skip: channelsPerPage})
			.then(checkIfNoChannels(...noChannelsMessage))
			.then(data => {
				if (data.metaData)
					initalizePage(channelsPerPage, 1, data.metaData.totalChannels, 0);
				return data;
			})

		return () => {
			fetchClear();
			initalizePage(1, 1, 1, 0);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!initalized) {
			fetching(getChannels, 'data', {page, skip: channelsPerPage});
		} 
	}, [fetching, page, initalized])

	const searchHandler = searchText => e => {
		if (messageObj.message !== noChannelsMessage[0]) {
			setMessage('');
			fetching(getChannels, 'data', {
				page: 1, 
				skip: channelsPerPage, 
				text: searchText
			})
				.then(checkIfNoChannels(`No channels found for '${searchText}'.`))
				.catch(unauthorized(props.history));
		}
	}; 

	const playAllSongs = e => {
		const allSongs = data.channels
			.map(channel => channel.songs.map(assoc('channelTitle', channel.title)))
			.reduce((acc, songs) => acc.concat(songs), []);

		playList(allSongs);
	};

	return (
		<div>
			<Header>My Channels</Header>
			<ButtonOrNull
				bool={data.channels && data.channels.length > 0}
				color={colors.color3}
				background={colors.color1}
				bs={true}
				display="block"
				onClick={playAllSongs}
			>
				Play All
			</ButtonOrNull>
			<SearchBar clickHandler={searchHandler}/>
			<PaginationOrNull
				bool={metaData && metaData.pageLimit > 1}
			/>
			<Loader 
				css={{'margin-top': '2em'}} 
				isLoading={isLoading} 
				fill={colors.color1}
			>
				<MessageOrNull 
					bool={messageObj.message !== ''} 
					links={messageObj.links}
				>
					{messageObj.message}
				</MessageOrNull>
				<ChannelList 
					channels={data.channels || []} 
					history={props.history}
				/>
			</Loader>
		</div>
	);
});
