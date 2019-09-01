import styled from 'styled-components';
import {TransformButton} from '../Buttons';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	border: 3px solid transparent;
	padding: 10px;
	position: relative;
	transition: all 0.3s ease-in-out;

	@media (min-width: 576px) {
		width: 50%;
	}

	@media (min-width: 992px) {
		width: 33.33%;
	}

	:hover div {
		opacity: 0.5;
	}

	:hover button {
		opacity: 1;
		transform: translateX(0);
	}
`;

export const Inner = styled.div`
	margin: auto;
	text-align: center;

	h4 {
		font-weight: bold;
	}

	p:last-of-type {
		margin-bottom: 0;
	}
`;

export const ChannelImg = styled.img`
	display: block;
	margin: 0 auto 15px;
	width: 136px;
	height: 136px;
	border-radius: 50%;
`;

export const VideoImg = styled.img`
	width: 100%
	margin-bottom: 15px;
`;

export const Button = TransformButton;
