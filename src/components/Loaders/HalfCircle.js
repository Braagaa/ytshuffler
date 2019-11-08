import React from 'react';
import styled, {keyframes} from 'styled-components';

import {MainWrapper} from './style';
import {ReactComponent as HalfCircle} from '../../imgs/refresh.svg';

const rotate = keyframes`
	100% {transform: rotate3d(0, 0, 1, 3turn);}
`;

const Wrapper = styled(MainWrapper)`
	svg {
		animation: ${rotate} 3s linear infinite;
	}

`;

export default function(props) {
	return (
		<Wrapper isLoading={props.isLoading} size={props.size}>
			<HalfCircle fill={props.fill}/>
		</Wrapper>
	);
};
