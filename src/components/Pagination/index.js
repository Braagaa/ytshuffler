import React from 'react';
import styled from 'styled-components';

import {Prev, Next, Icon, PageNum} from './styles';

const Wrappper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	position: relative;
	margin: 1.1em 0;
`;

export default function(props) {
	return(
		<Wrappper>
			<Prev hidden={props.page <= 1} onClick={props.prevPage}>
				<Icon/>
			</Prev>
			<Next 
				hidden={props.page >= props.maximumItems / props.itemsPerPage} 
				onClick={props.nextPage}
			>
				<Icon/>
			</Next>
			<PageNum>Page {props.page}</PageNum>
		</Wrappper>
	);
};
