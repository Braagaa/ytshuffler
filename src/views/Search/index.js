import React from 'react';

import SearchBar from '../../components/SearchBar';
import Results from '../../components/Results';

export default function(props) {
	return (
		<div>
			<form>
				<SearchBar text="Search"/>
			</form>
			<h2 className="mb-2 pl-4">Results</h2>
			<Results/>
		</div>
	);
};
