import React from 'react';
import styled from 'styled-components';

import main from '../../style/main';

const StyledButton = styled.button`
	background-color: ${props => props.color || 'white'};
	color: ${main.colors.color3};
	border: none;
	width: 300px;
	height: 80px;
	padding: 0 1em;
	font-size: 1.1em;
	font-weight: 700;
	letter-spacing: 1px;

	@media (max-width: 400px) {
		font-size: 75%;
		width: 200px;
	}
`;

export const SmallButton = styled.button`
	padding: 13px 20px;
	color: ${props => props.color};
	background: ${props => props.background};
	letter-spacing: 1px;
	font-size: 1.2em;
	font-weight: bold;
	border: none;
`;

export const TransformButton = styled(SmallButton)`
	position: absolute;
	cursor: pointer;
	opacity: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${({transform}) => transform === 'scale' ? 
		'scale(0)' : 'translateY(-100px)'};
	transition: all 0.2s ease-in;
`;

export const Pill = styled.button`
	background-color: ${props => props.bg};
	color: ${props => props.color};
	border: none;
	border-radius: 1em;
	display: inline-block;
	padding: .50em .8em;
	font-size: 75%;
	font-weight: 700;
	text-align: center;
	letter-spacing: 1px;
	cursor: pointer;
`;

export default function Button(props) {
	return (
		<StyledButton 
			onClick={props.clickHandle}
		>
				{props.children.toUpperCase()}
		</StyledButton>
	);
};
