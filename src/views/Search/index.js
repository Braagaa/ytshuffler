import React, {useState} from 'react';

import SearchBar from '../../components/SearchBar';
import RadioGroup from '../../components/RadioGroup';
import Results from '../../components/Results';

export default function(props) {
	const [categoryChecked, setCategoryChecked] = useState({});
	const handleCategoryChecked = e => setCategoryChecked({
		[e.target.name]: e.target.value
	});

	return (
		<div>
			<form>
				<SearchBar text="Search"/>
				<RadioGroup 
					title="Category"
					name="category"
					values={['All', 'Channels', 'Songs']}
					checked={categoryChecked.category || 'all'}
					handler={handleCategoryChecked}
				/>
			</form>
			<h2 className="mb-2 pl-4">Results</h2>
			<Results/>
		</div>
	);
};
