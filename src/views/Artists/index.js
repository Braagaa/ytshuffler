import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../../components/Headers/';
import SearchBar from '../../components/SearchBar/';
import Pagination from '../../components/Pagination';
import Message from '../../components/Message';
import Artists from '../../components/Artists';
import PreLoader from '../../components/Loaders';
import Conditional from '../../components/Conditional';

import {getAllArtistsPlaylists} from '../../apis/shuffler';
import {usePagination, useArtistsImages} from '../../hooks';
import {initalizePage} from '../../actions/pagination';
import {initalFetch, fetching, exit} from '../../actions/fetching';
import {unauthorized} from '../../utils/auth';
import {path, thunk} from '../../utils/func';

const artistsPerPage = 50;
const Loader = PreLoader();
const PaginationOrNull = Conditional(Pagination);
const MessageOrNull = Conditional(Message);

const mapStateToProps = storeData => ({
	isLoading: storeData.fetching.isLoading || false,
	pagination: storeData.pagination || {},
	data: storeData.fetching.data || [],
	search: storeData.input.search || ''
});
const mapDispatchToProps = {initalFetch, exit, fetching, initalizePage};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const ArtistsView = connectFunction(function(props) {
	const {isLoading, pagination, search, data: {artists = []}} = props;
	const {initalFetch, fetching, initalizePage, exit} = props;
	const [initialLoad, setInitialLoad] = useState(true);

	const noResultsFound = !search ?
		'No artists found in your channels.' :
		`'${search}' cannot be found in your channels.`;

	useEffect(() => {
		initalFetch(
			getAllArtistsPlaylists, 
			'data', 
			{page: 1, skip: artistsPerPage}
		)
			.then(path('metaData.totalArtists'))
			.then(totalArtists => initalizePage(
				artistsPerPage, 
				1, 
				totalArtists, 
				0
			))
			.then(thunk(setInitialLoad, false));
		
		return () => exit();
	}, [exit, initalFetch, initalizePage]);

	usePagination(
		getAllArtistsPlaylists, 
		'data', 
		pagination, 
		props.history, 
		{page: pagination.page, skip: artistsPerPage, text: search}
	);

	useArtistsImages(artists);
	console.log('bro');

	const onSearch = searchText => e => {
		return fetching(getAllArtistsPlaylists, 'data', {
			page: 1, 
			skip: artistsPerPage,
			text: searchText
		})
			.then(path('metaData.totalArtists'))
			.then(totalArtists => initalizePage(
				artistsPerPage, 
				1, 
				totalArtists, 
				0
			))
			.catch(unauthorized(props.history));
	};

	return(
		<Loader isLoading={initialLoad} lm="3em">
			<Header>Artists</Header>
			<SearchBar mb="2.5em" clickHandler={onSearch}/>
			<Loader isLoading={isLoading} lm="3em">
				<PaginationOrNull bool={artists.length > 0}/>
				<MessageOrNull bool={!initialLoad && artists.length === 0}>
					{noResultsFound}
				</MessageOrNull>
				<Artists artists={artists}/>
				<PaginationOrNull bool={artists.length > 0}/>
			</Loader>
		</Loader>
	);
});

export default ArtistsView;

ArtistsView.propTypes = {
	initalFetch: PropTypes.func,
	initalizePage: PropTypes.func,
	fetching: PropTypes.func,
	exit: PropTypes.func,
	search: PropTypes.string,
	isLoading: PropTypes.bool,
	pagination: PropTypes.object,
	data: PropTypes.object
};
