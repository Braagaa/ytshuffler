import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';

const Modal = styled.div`
	visibility: ${props => props.on ? 'visible' : 'hidden'};
	position: fixed;
	display: flex;
	justify-content: center;
	top: 50%;
	left: 50%;
	overflow-y: scroll;
	width: 100%;
	height: 100vh;
	z-index: 200;
	transform: translateX(-50%) translateY(-50%);

	@media (max-width: 400px) {
		font-size: 75%;
	}
`;

const ContentWrapper = styled.div`
	color: ${props => props.color || main.colors.color3};
	position: relative;
	margin: auto;
	border-radius: 3px;
	transform: scale(${props => props.on ? '1' : '0'});
	opacity: ${props => props.on ? '1' : '0'};
	background: transparent;
	transition: all 0.3s;
`;

export default function(props) {
	return (
		<Modal {...props}>
			<ContentWrapper {...props}>
				{props.children}
			</ContentWrapper>
		</Modal>
	);
};
