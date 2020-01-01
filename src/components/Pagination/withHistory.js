import React from 'react';
import {withRouter} from 'react-router';
import {checkValidPage} from '../../utils/math';

import {Prev, Next, Icon, PageNum} from './styles';
import {Wrappper} from './index';

const inc = num => num + 1;
const dec = num => num - 1;
const changePage = incDec => (page, pathname, query) => {
	query.set('p', incDec(page));
	return pathname + '?' + query.toString();
};
const incPage = changePage(inc);
const decPage = changePage(dec);

export default withRouter(function(props) {
	const {pageLimit} = props;

	const {pathname, search} = props.history.location;
	const query = new URLSearchParams(search);
	const page = checkValidPage(parseInt(query.get('p')) || 1, pageLimit);

	const prevPage = e => {
		props.history.push(decPage(page, pathname, query));
	};

	const nextPage = e => {
		props.history.push(incPage(page, pathname, query));
	};

	return(
		<Wrappper>
			<Prev hidden={page <= 1} onClick={prevPage}>
				<Icon/>
			</Prev>
			<Next 
				hidden={page >= pageLimit} 
				onClick={nextPage}
			>
				<Icon/>
			</Next>
			<PageNum>Page {page}</PageNum>
		</Wrappper>
	);
});
