import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import PreLoader from '../../components/Loaders';
import Conditional from '../../components/Conditional';
import Pagination from '../../components/Pagination';

import {initalizePage, currentPage} from '../../actions/pagination';
import {getSearchResults, checkToChannels} from '../../actions/searchResults';
import {modalMode} from '../../actions/modal';
import main from '../../style/main';

const Loader = PreLoader();
const PaginationOrNull = Conditional(Pagination);

const mapStateToProps = storeData => ({
	pagination: storeData.pagination,
	searchResults: storeData.searchResults
});
const mapDispatchToProps = {
	initalizePage, 
	currentPage,
	getSearchResults,
	checkToChannels,
	modalMode
};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {initalizePage, getSearchResults, checkToChannels} = props;
	const {page, itemsPerPage, offset} = props.pagination;
	const {isLoading, results: items, isError} = props.searchResults;

	const query = new URLSearchParams(props.history.location.search)
		.get('q');
	const [q, setq] = useState(query);
	const displayedItems = items.slice(offset, itemsPerPage * page);

	const onSubmitHandle = value => e => {
		props.history.push('/search?q=' + value);
		setq(value);
	};

	useEffect(() => {
		getSearchResults(q, 10)
			.then(items => initalizePage(10, 1, items.length, 0));
	}, [q, initalizePage, getSearchResults]);

	useEffect(() => {
		if (!isLoading && !isError) {
			checkToChannels(items, offset, page, itemsPerPage);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<div>
			<form onSubmit={onSubmitHandle}>
				<SearchBar
					history={props.history} 
					text="Search"
					clickHandler={onSubmitHandle}
					value={q}
				/>
			</form>
			<h2 className="mb-2 pl-4">Results</h2>
			<PaginationOrNull 
				bool={!isLoading && items.length > 0}
			/>
			<Loader fill={main.colors.color1} isLoading={isLoading}>
				<Results history={props.history} items={displayedItems}/>
			</Loader>
			<PaginationOrNull 
				bool={!isLoading && items.length > 0}
			/>
		</div>
	);
});
