import React, {useState, useEffect} from 'react';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';

import {getYoutubeSearch, getYoutubeChannels} from '../../apis/shuffler';
import {spliceInto} from '../../utils/func';

const itemsPerPage = 10;

export default function(props) {
	const query = new URLSearchParams(props.history.location.search)
		.get('q');
	const [q, setq] = useState(query);
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);

	const offset = (itemsPerPage * page) - itemsPerPage;
	const displayedItems = items.slice(offset, itemsPerPage * page);

	const onSubmitHandle = value => e => {
		e.preventDefault();
		props.history.push('/search?q=' + value);
		setq(value);
	};

	useEffect(() => {
		if (q) {
			getYoutubeSearch(q)
				.then(res => setItems(res.data.items))
				.then(() => setPage(1));
		}
	}, [q]);

	useEffect(() => {
		const channelIds = displayedItems
			.filter(channel => channel.kind === 'youtube#searchResult')
			.map(channel => channel.id.channelId)
			.join(',');

			if (channelIds) {
				getYoutubeChannels(channelIds)
					.then(res => res.data.items)
					.then(spliceInto(items, offset, itemsPerPage * page))
					.then(setItems);
			}
	}, [items, offset, page, displayedItems]);

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
			<Results items={displayedItems}/>
		</div>
	);
};
