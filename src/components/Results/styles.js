import styled from 'styled-components';
import {SmallButton} from '../Buttons';

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

	:hover :first-child img,
	:hover :first-child div {
		opacity: 0.5;
	}

	:hover :last-child {
		opacity: 1;
		transform: translateY(0);
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

export const ListTopicIds = styled.ul`
	margin: 0 0 5px;
	padding: 0;
	list-style-type: none;
	display: flex;
	flex-direction: column;

	li {
		margin: 0;
		text-align: center;
	}
`;

export const Buttons = styled.div`
	position: absolute;
	opacity: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateY(-100px);
	transition: all 0.2s ease-in;
	flex-direction: column;

	a {
		margin-top: 10px;
	}
`;

const shardedProps = `
	width: 180px;
`;

export const Button = styled(SmallButton)`
	${shardedProps}
`;

export const Link = styled.a`
	padding: 13px 20px;
	color: ${props => props.color};
	background: ${props => props.background};
	letter-spacing: 1px;
	font-size: 1.2em;
	font-weight: bold;
	border: none;
	cursor: pointer;
	text-align: center;
	${shardedProps}
`;
