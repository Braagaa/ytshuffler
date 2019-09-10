import React from 'react';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';

export default function(props) {
	const q = new URLSearchParams(props.history.location.search)
		.get('q');

	const onSubmitHandle = e => {
		e.preventDefault();
		//may need to change the location to server later on in production
		
	};

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
			<Results/>
		</div>
	);
};
