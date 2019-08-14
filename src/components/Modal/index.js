import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
	visibility: ${props => props.on ? 'visible' : 'hidden'};
	position: fixed;
	top: 50%;
	left: 50%;
	width: 50%;
	max-width: 320px;
	min-width: 320px;
	height: auto;
	z-index: 200;
	transform: translateX(-50%) translateY(-50%);

	@media (max-width: 400px) {
		font-size: 75%;
	}
`;

const ContentWrapper = styled.div`
	color: ${props => props.color};
	position: relative;
	border-radius: 3px;
	margin: 0 auto;
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
