import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';

const Label = styled.label`
	display: inline-block;
	padding: 0 5px;
	font-weight: 700;
	font-size: 3em;
	margin-top: 40px;
`;

const Input = styled.input`
	display: block;
	padding-bottom: 0.15em;
	width: 80%;
	border: none;
	border-bottom: 2px solid ${main.colors.color1};
	background-color: transparent;
	color: ${main.colors.color1};
	font-weight: bold;
	font-size: 1.5em;
	outline: none;
	margin-bottom: 1em;
`;

export default function(props) {
	return (
		<>
			<Label htmlFor="search">{props.text}</Label>
			<Input placeholder="Type here..." id="search" type="text"/>
		</>
	);
};
