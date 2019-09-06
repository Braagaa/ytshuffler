import React from 'react';
import styled from 'styled-components';

import main from '../../style/main';

const Tooltip = styled.div`
	display: inline-block;
	position: relative;
	z-index: 300;

	:hover span {
		opacity: 1;
		visibility: visible;
		transform: translate(-100px, -8px); 
	}
`;

const TooltipItem = styled.div`
	cursor: pointer;
	display: inline-block;
	font-weight: 700;
	max-width: 500px;
`;

const TooltipContent = styled.span`
	display: inline;
	width: 200px;
	padding: 10px;
	transition: all 0.2s ease;
	position: absolute;
	z-index: 200;
	left: 50%;
	bottom: 100%;
	text-align: left;
	font-size: 0.8em;
	box-shadow: -5px -5px 15px rgba(48,54,61,0.2);
	visibility: hidden;
	background: ${main.colors.color6};
	opacity: 0;
	transform: translate(-100px, -20px);
	border: 2px white solid;
	border-radius: 5px;
`;

export default function(Component) {
	return function(props) {
		return (
			<Tooltip>
				<TooltipItem>
					<Component {...props}/>
				</TooltipItem>
				<TooltipContent>{props.children}</TooltipContent>
			</Tooltip>
		);
	};
}; 
