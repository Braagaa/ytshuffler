import React, {useState, useEffect} from 'react';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';
import PreLoader from '../../components/Loaders';
import Conditional from '../../components/Conditional';
import Pagination from '../../components/Pagination';

import {getYoutubeSearch, getYoutubeChannels} from '../../apis/shuffler';
import {spliceInto} from '../../utils/func';
import {setState, prevPage, nextPage} from '../../utils/commonEvent';
import {getOffset} from '../../utils/math';

const Loader = PreLoader(Results);
const PaginationOrNull = Conditional(Pagination);
const itemsPerPage = 10;

export default function(props) {
	const query = new URLSearchParams(props.history.location.search)
		.get('q');
	const [q, setq] = useState(query);
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const offset = getOffset(itemsPerPage, page);
	const displayedItems = items.slice(offset, itemsPerPage * page);

	const prevPageHandle = prevPage(itemsPerPage, page);
	const nextPageHandle = nextPage(itemsPerPage, page, items.length);

	const onSubmitHandle = value => e => {
		e.preventDefault();
		props.history.push('/search?q=' + value);
		setq(value);
	};

	useEffect(() => {
		if (q) {
			getYoutubeSearch(q)
				.then(res => setItems(res.data.items))
				.then(setState(setPage, 1))
				.then(setState(setIsLoading, true))
		}
	}, [q]);

	useEffect(() => {
		const channelIds = displayedItems
			.filter(channel => channel.kind === 'youtube#searchResult')
			.map(channel => channel.id.channelId)
			.join(',');
			
			if (channelIds) {
				setIsLoading(true);
				getYoutubeChannels(channelIds)
					.then(res => res.data.items)
					.then(spliceInto(items, offset, itemsPerPage))
					.then(setItems)
					.then(setState(setIsLoading, false))
			}
	}, [items, offset, displayedItems]);

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
				page={page} 
				maximumItems={items.length}
				itemsPerPage={itemsPerPage}
				prevPage={prevPageHandle(setPage)}
				nextPage={nextPageHandle(setPage)}
			/>
			<Loader 
				isLoading={isLoading} 
				items={displayedItems}
			/>
		</div>
	);
};
