import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import PreLoader from '../../components/Loaders';
import Conditional from '../../components/Conditional';
import Pagination from '../../components/Pagination';

import {initalizePage, currentPage} from '../../actions/pagination';
import {tap} from '../../utils/func';
import {getYoutubeSearch, getYoutubeChannels} from '../../apis/shuffler';
import {setState} from '../../utils/commonEvent';
import {spliceInto} from '../../utils/func';
import {getOffset} from '../../utils/math';

const Loader = PreLoader(Results);
const PaginationOrNull = Conditional(Pagination);
const itemsPerPage = 10;

const mapStateToProps = storeData => ({page: storeData.page});
const mapDispatchToProps = {initalizePage, currentPage};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {page, initalizePage} = props;
	const query = new URLSearchParams(props.history.location.search)
		.get('q');
	const [q, setq] = useState(query);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const isCancelled = React.useRef(false);

	const offset = getOffset(itemsPerPage, page);
	const displayedItems = items.slice(offset, itemsPerPage * page);

	const onSubmitHandle = value => e => {
		e.preventDefault();
		props.history.push('/search?q=' + value);
		setq(value);
	};

	useEffect(() => {
		if (q) {
			getYoutubeSearch(q)
				.then(res => res.data.items)
				.then(tap(items => setItems(items)))
				.then(items => initalizePage(itemsPerPage, 1, items.length))
		}
	}, [q, initalizePage]);

	useEffect(() => {
		const channelIds = displayedItems
			.filter(channel => channel.kind === 'youtube#searchResult')
			.map(channel => channel.id.channelId)
			.join(',');

		if (!isCancelled.current && channelIds) {
			isCancelled.current = true;
			setIsLoading(true);
			getYoutubeChannels(channelIds)
				.then(res => res.data.items)
				.then(spliceInto(items, offset, itemsPerPage))
				.then(items => setItems(items))
				.then(setState(setIsLoading, false))

		}

		return () => isCancelled.current = false;
	}, [items, displayedItems, offset]);

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
			<Loader 
				isLoading={isLoading} 
				items={displayedItems}
			/>
		</div>
	);
});
