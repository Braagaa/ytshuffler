import styled, {keyframes} from 'styled-components';
import main from '../../style/main'; 

const {colors:{color1: white}} = main;

export const offsetAnimation = keyframes`
	100% {
		stroke-dashoffset: 0;
	}
`;

export const fillItAnimation = keyframes`
	100% {
		fill: ${white};
	}
`;

export const Wrapper = styled.div`
	width: 100%;
`;

export const LogoWrapper = styled.div`
	margin: 5em auto 3em;
	width: 300px;
	height: 300px;

	.logo {
		stroke: ${props => props.fill || white};
		stroke-width: 4;
		stroke-dasharray: 5683;
		stroke-dashoffset: 5683;
		animation: ${offsetAnimation} 5s linear forwards, ${fillItAnimation} 0.8s 2s forwards;
	}
`;
