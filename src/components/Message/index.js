import React from 'react';
import styled from 'styled-components';
import Link from './Link';

const defaultProps = (prop, def) => props => props[prop] || def;

const Wrappper = styled.div`
	font-size: ${defaultProps('fs', '2em')};
	text-align: ${defaultProps('ta', 'center')};
	margin-top: ${defaultProps('mt', '0')};
	margin-bottom: ${defaultProps('mb', '0')};
	${props => props.css || ''}
`;

export default function(props) {
	const message = props.children
		.split('<link>')
		.map((str, i) => i % 2 === 0 ? str : 
			<Link to={props.links[Math.floor(i / 2)]} key={str}>{str}</Link>
		);

	return (
		<Wrappper {...props}>
			{message}
		</Wrappper>
	);
};
