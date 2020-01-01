import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../../components/Headers/';
import SearchBar from '../../components/SearchBar/';
import Pagination from '../../components/Pagination/withHistory';
import Message from '../../components/Message';
import Artists from '../../components/Artists';
import PreLoader from '../../components/Loaders';
import Conditional from '../../components/Conditional';

import {getAllArtistsPlaylists} from '../../apis/shuffler';
import {initalizePage} from '../../actions/pagination';
import {fetching, exit} from '../../actions/fetching';
import {unauthorized} from '../../utils/auth';
import {path, thunk} from '../../utils/func';
import {useArtistsImages} from '../../hooks';
import {checkValidPage} from '../../utils/math';

const artistsPerPage = 50;
const Loader = PreLoader();
const PaginationOrNull = Conditional(Pagination);
const MessageOrNull = Conditional(Message);

const mapStateToProps = storeData => ({
	isLoading: storeData.fetching.isLoading || false,
	data: storeData.fetching.data || [],
	search: storeData.input.search || ''
});
const mapDispatchToProps = {exit, fetching, initalizePage};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const ArtistsView = connectFunction(function(props) {
	const {isLoading, history, search, data: {artists = []}} = props;
	const {fetching, initalizePage, exit} = props;
	const [initialLoad, setInitialLoad] = useState(true);
	const [pageLimit, setPageLimit] = useState(1);

	const noResultsFound = !search ?
		'No artists found in your channels.' :
		`'${search}' cannot be found in your channels.`;

	const query = new URLSearchParams(props.history.location.search);
	const p = checkValidPage(parseInt(query.get('p') || 1), pageLimit);
	const q = query.get('q') || '';

	useEffect(() => {
		fetching(
			getAllArtistsPlaylists,
			'data',
			{page: p, skip: artistsPerPage, text: q}
		)
			.then(path('metaData.pageLimit'))
			.then(setPageLimit)
			.then(thunk(setInitialLoad, false))
			.catch(unauthorized(history));

		return () => exit();
	}, [q, p, exit, history, fetching, initalizePage]);

	useArtistsImages(artists);

	const onSearch = searchText => e => {
		history.push(`artists?q=${searchText}&p=1`);
	};

	return(
		<Loader isLoading={initialLoad} lm="3em">
			<Header>Artists</Header>
			<SearchBar mb="2.5em" clickHandler={onSearch}/>
			<Loader isLoading={isLoading} lm="3em">
				<PaginationOrNull 
					pageLimit={pageLimit}
					bool={artists.length > 0}
				/>
				<MessageOrNull bool={!initialLoad && artists.length === 0}>
					{noResultsFound}
				</MessageOrNull>
				<Artists artists={artists}/>
					<PaginationOrNull 
					pageLimit={pageLimit}
					bool={artists.length > 0}
				/>
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
	data: PropTypes.object
};
