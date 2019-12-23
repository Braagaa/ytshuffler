import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Wrapper = styled.div`
	display: inline-block;
	font-size: 1em;
	margin: 0px;
	font-weight: 600;
	margin-top: 1.5em;

	@media (min-width: 660px) {
		margin: 0;
	}

	@media (min-width: 768px) {
		margin: 10px;
	}

	@media (min-width: 992px) {
		font-size: 1.3em;
	}
`;

export default function(props) {
	return (
		<Wrapper className="link">
			<NavLink to={props.link}>{props.text}</NavLink>
		</Wrapper>
	);
};
