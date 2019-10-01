import React from 'react';
import styled, {keyframes} from 'styled-components';

import {MainWrapper} from './style';
import {ReactComponent as DotsSVG} from '../../imgs/waiting.svg';

const animation = keyframes`
	0% {transform: scale(1);}
	16.67% {transform: scale(0.5);}
	33.33% {transform: scale(1);}
`;

const animation1 = keyframes`
	33.33% {transform: scale(1);}
	50% {transform: scale(0.5);}
	66.66% {transform: scale(1);}
`;

const animation2 = keyframes`
	66.66% {transform: scale(1);}
	83.33% {transform: scale(0.5);}
	100% {transform: scale(1);}
`;

const Wrapper = styled(MainWrapper)`
	svg path {
		transform-origin: center;
	}

	#dot1 {
		animation: 2s linear infinite ${animation};
	}

	#dot3 {
		animation: 2s linear infinite ${animation1};
	}

	#dot2 {
		animation: 2s linear infinite ${animation2};
	}
`;

export default function(props) {
	return (
		<Wrapper isLoading={props.isLoading} size={props.size}>
			<DotsSVG fill={props.fill}/>
		</Wrapper>
	);
};
