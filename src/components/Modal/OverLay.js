import React from 'react';
import styled, {css} from 'styled-components';
import main from '../../style/main';

const visibility = css`
	visibility: ${props => props.on ? 'visible' : 'hidden'};
	opacity: ${props => props.on ? '1' : '0'};
`;

export const OverLay = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	background: ${props => props.background || main.colors.color1};
	transition: all 0.3s;
	${props => visibility}
`;

export default function(props) {
	return (
		<OverLay {...props} background={props.background}/>
	);
};
