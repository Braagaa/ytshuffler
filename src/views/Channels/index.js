import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getChannels, getFavouriteSongs} from '../../apis/shuffler';
import {fetching, fetchClear} from '../../actions/fetching';
import {playList, playAllSongs, playFavouriteChannels} from '../../actions/player';
import {useMessages} from '../../hooks/';
import {setState} from '../../utils/commonEvent';

import Header from '../../components/Headers';
import ChannelList from '../../components/ChannelList';
import Loaders from '../../components/Loaders';
import Pagination from '../../components/Pagination/withHistory';
import SearchBar from '../../components/SearchBar';
import Conditional from '../../components/Conditional';
import Message from '../../components/Message';
import {SmallButton} from '../../components/Buttons';
import {ButtonsWrapper} from './style';
import Modal from '../../components/Modal/';
import InfoModal from '../../components/InfoModal';
import OverLay from '../../components/Modal/OverLay';

import mainStyle from '../../style/main';
import {unauthorized} from '../../utils/auth';
import {ifElse, pathOr} from '../../utils/func';

const {colors} = mainStyle;
const Loader = Loaders();
const PaginationOrNull = Conditional(Pagination);
const MessageOrNull = Conditional(Message);
const WrapperOrNull = Conditional(ButtonsWrapper);
const ShowFavButtonOrNull = Conditional(SmallButton);
const PlayFavButtonOrNull = Conditional(SmallButton);
const channelsPerPage = 10;
const noChannelsMessage = [
	"You have no channels. Why don't you <link>add<link> some?",
	['/search']
];

const mapStateToProps = storeData => ({
	data: storeData.fetching.data || {},
	favouriteSongs: storeData.fetching.favouriteSongs || {songs: []},
	error: storeData.fetching.error,
	initalized: storeData.pagination.initalized,
	modal: storeData.modal
});
const mapDispatchToProps = {
	fetching, 
	fetchClear, 
	playList,
	playAllSongs, 
	playFavouriteChannels
};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {data, modal, favouriteSongs, history} = props;
	const {fetching, fetchClear, playList, playAllSongs} = props;
	const {metaData} = data;
	const [pageLimit, setPageLimit] = useState(1);
	const [favouritesLoading, setFavouritesLoading] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const [messageObj, setMessage] = useMessages(false);

	const checkIfNoChannels = (message, links) => data => {
		if (data.channels.length === 0) setMessage(message, links);
		return data;
	};

	const requestPageLimit = data => data.metaData && data.metaData.page > data.metaData.pageLimit ?
		fetching(getChannels, 'data', {
			page: data.metaData.pageLimit, 
			skip: channelsPerPage,
			text: search,
			favourites
		}) : data;

	const query = new URLSearchParams(props.history.location.search);
	const favourites = query.get('type') === 'fav';
	const search = query.get('search');
	const page = parseInt(query.get('p') || 1);
	const p = isNaN(page) ? 1 : page < 1 ? 1 : page;

	useEffect(() => {
		fetching(getFavouriteSongs, 'favouriteSongs')
			.then(setState(setFavouritesLoading, false))
			.catch(unauthorized(history));

		return () => fetchClear();
	}, [fetching, setFavouritesLoading, history, fetchClear]);

	useEffect(() => {
		setLoading(true);
		setMessage('');
		fetching(getChannels, 'data', {
			page: p,
			skip: channelsPerPage, 
			text: search, 
			favourites
		})
			.then(requestPageLimit)
			.then(ifElse(
				search, 
				checkIfNoChannels(`No channels found for '${search}'.`),
				checkIfNoChannels(...noChannelsMessage)
			))
			.then(pathOr('metaData.pageLimit', 1))
			.then(setPageLimit)
			.then(setState(setLoading, false))
			.catch(unauthorized(props.history));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favourites, search, p]);

	const searchHandler = searchText => e => {
		if (messageObj.message !== noChannelsMessage[0]) {
			setMessage('');
			props.history.push(`channels?search=${searchText}`);
		}
	}; 

	const playAllSongsHandler = e => {
		playAllSongs()
			.catch(unauthorized(props.history));
	};

	const playFavourites = e => {
		playList(favouriteSongs.songs);
	};

	const showFavouriteChannels = e => {
		if (!favourites) 
			return props.history.push('channels?type=fav');
		return props.history.push('channels');
	};

	return (
		<div>
			<Header>My Channels</Header>
			<WrapperOrNull bool={data.channels && data.channels.length > 0}>
				<SmallButton
					color={colors.color3}
					background={colors.color1}
					bs={true}
					display="block"
					onClick={playAllSongsHandler}
				>
					Play All
				</SmallButton>
				<PlayFavButtonOrNull
					bool={favouriteSongs.songs.length > 0}
					color={colors.color3}
					background={colors.color1}
					bs={true}
					display="block"
					onClick={playFavourites}
				>
					Play Favourites
				</PlayFavButtonOrNull>
				<ShowFavButtonOrNull
					bool={favouriteSongs.songs.length > 0}
					color={colors.color3}
					background={colors.color1}
					bs={true}
					display="block"
					onClick={showFavouriteChannels}
				>
					{favourites ? 'Show Channels' : 'Show Favourites'}
				</ShowFavButtonOrNull>
			</WrapperOrNull>
			<SearchBar clickHandler={searchHandler}/>
			<PaginationOrNull
				pageLimit={pageLimit}
				bool={metaData && metaData.pageLimit > 1}
			/>
			<Loader 
				css={{'margin-top': '2em'}} 
				isLoading={isLoading || favouritesLoading} 
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
			<Modal on={modal.on}>
				<InfoModal/>
			</Modal>
			<OverLay on={modal.on}/>
		</div>
	);
});
