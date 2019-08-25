import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';
import {ReactComponent as SearchIcon} from '../../imgs/search.svg';

const Label = styled.label`
	display: inline-block;
	padding: 0 5px;
	font-weight: 700;
	font-size: 3em;
	margin-top: 40px;
`;

const Input = styled.input`
	display: inline-block;
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

const SearchIconWrapper = styled.div`
	cursor: pointer;
	margin-left: 20px;
	display: inline-block;
	width: 36px;
	height: 36px;
`;

export default function(props) {
	return (
		<>
			<Label htmlFor="search">{props.text}</Label>
			<div>
				<Input placeholder="Type here..." id="search" type="text"/>
				<SearchIconWrapper>
					<SearchIcon fill={main.colors.color1}/>
				</SearchIconWrapper>
			</div>
		</>
	);
};
