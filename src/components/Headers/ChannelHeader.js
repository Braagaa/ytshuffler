import React from 'react';
import styled from 'styled-components';
import Header from './index.js';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;

	h1 {
		align-self: center;

		@media (min-width: 768px) {
			margin: auto;
		}
	}
`;

export default function(props) {
	return (
		<Wrapper>
			<img src={props.src} alt={props.title}/>
			<Header>{props.children}</Header>
		</Wrapper>
	);
};
