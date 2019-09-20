import React from 'react';
import styled, {keyframes} from 'styled-components';

import {ReactComponent as DiscSVG} from '../../imgs/disc.svg';

import main from '../../style/main';

const spin3D = keyframes`
	100% {transform: rotate3d(0, 0, 1, 3turn);}
`; 

const Wrapper = styled.div`
	width: 120px;
	height: 120px;
	margin: 0 auto;
	
	visibility: ${props => !props.isLoading ? 'hidden' : 'visible'};
	display: ${props => !props.isLoading ? 'none' : 'block'};

	svg {
		animation: ${spin3D} 3s linear infinite;
	}

	p {
		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
	}
`;

const LoaderWrap = styled.div`
	visibility: ${props => props.isLoading ? 'hidden' : 'visible'};
`;

export default function(Component) {
	return function({isLoading, ...props}) {
		return (
			<div>
				<Wrapper isLoading={isLoading}>
					<DiscSVG fill={main.colors.color1}/>	
					<p>Loading</p>
				</Wrapper>
				<LoaderWrap isLoading={isLoading}>
					<Component {...props}/>
				</LoaderWrap>
			</div>
		);
	}
};
