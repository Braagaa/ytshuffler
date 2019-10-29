import React from 'react';
import styled, {keyframes} from 'styled-components';
import {ReactComponent as DiscSVG} from '../../imgs/disc.svg';

import {MainWrapper} from './style';

const spin3D = keyframes`
	100% {transform: rotate3d(0, 0, 1, 3turn);}
`; 

const Wrapper = styled(MainWrapper)`
	svg {
		animation: ${spin3D} 3s linear infinite;
	}

	p {
		font-size: 1.5em;
		font-weight: bold;
		text-align: center;
	}

	${({lm}) => lm ? 'margin-top: ' + lm : ''}
`;

export default function(props) {
	return (
		<Wrapper lm={props.lm} isLoading={props.isLoading}>
			<DiscSVG fill={props.fill} size={props.size}/>
			<p>Loading</p>
		</Wrapper>
	);
};
