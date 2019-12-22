import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const Wrappper = styled.div`
	font-size: 2em;
	text-align: center;
	margin-top: ${props => props.mt || '0'};
	${props => props.css || ''}
`;

export default function(props) {
	const message = props.children
		.split('<link>')
		.map((str, i) => i % 2 === 0 ? str : 
			<Link to={props.links[Math.floor(i / 2)]} key={str}>{str}</Link>
		);

	return (
		<Wrappper mt={props.mt} css={props.css}>{message}</Wrappper>
	);
};
