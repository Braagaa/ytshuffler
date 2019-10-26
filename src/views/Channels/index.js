import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getChannels} from '../../apis/shuffler';
import {initalizePage} from '../../actions/pagination';
import {fetching, fetchClear} from '../../actions/fetching';
import {useMessages} from '../../hooks/';

import Header from '../../components/Headers';
import ChannelList from '../../components/ChannelList';
import Loaders from '../../components/Loaders';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Conditional from '../../components/Conditional';
import Message from '../../components/Message';

import mainStyle from '../../style/main';

const {colors} = mainStyle;
const Loader = Loaders();
const PaginationOrNull = Conditional(Pagination);
const MessageOrNull = Conditional(Message);
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
const mapDispatchToProps = {initalizePage, fetching, fetchClear};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {data, isLoading, page, initalized} = props;
	const {initalizePage, fetching, fetchClear} = props;
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
			});

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
				.then(checkIfNoChannels(`No channels found for '${searchText}'.`));
		}
	}; 

	return (
		<div>
			<Header>My Channels</Header>
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
