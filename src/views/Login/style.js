import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';

import {ReactComponent as MusicSVG} from '../../imgs/music-player-ani.svg';
import {offsetAnimation, fillItAnimation} from '../../components/404/style';

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

export const Inner = styled.div`
	text-align: center;
	width: 100%;
`;

export const Header = styled.h1`
	font-size: 5em;
	font-weight: bold;
	margin-bottom: 0.5em;
`;

export const ButtonsWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;

	button {
		margin-top: 1.5em;		
		@media (min-width: 639px) {
			margin-top: 0;		
		}
	}
`;

const MusicWrap = styled.div`
	margin: 0 auto 3em;
	width: 150px
	height: 150px;
	@media (min-width: 639px) {
		width: 200px
		height: 200px;
	}

	.logo {
		stroke: ${main.colors.color1};
		stroke-width: 1;
		stroke-dasharray: 291;
		stroke-dashoffset: 291;
		animation: ${offsetAnimation} 1.9s linear forwards, ${fillItAnimation} 0.8s 2s forwards;
	}
`;

export const MusicNote = function(props) {
	return (
		<MusicWrap>
			<MusicSVG fill={main.colors.color1}/>
		</MusicWrap>
	);
}; 
