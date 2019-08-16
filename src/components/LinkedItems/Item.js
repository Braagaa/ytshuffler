import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Wrapper = styled.div`
	display: inline-block;
	font-size: 1em;
	margin: 0px;
	font-weight: 600;

	@media (min-width: 768px) {
		font-size: 1.5em;
		margin: 15px 25px;
	}
`;

export default function(props) {
	return (
		<Wrapper className="link">
			<NavLink to={props.link}>{props.text}</NavLink>
		</Wrapper>
	);
};
