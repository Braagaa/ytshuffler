import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';

import {ReactComponent as HeartSVG} from '../../imgs/heart.svg';
import {ReactComponent as UnfilledHeart} from '../../imgs/heart-unfilled.svg';
import {ConditionalLoader} from '../Conditional';

const propOrDeafult = (prop, def) => props => props[prop] || def;

const Wrapper = styled.div`
	width: ${propOrDeafult('size', '50px')};
	height: ${propOrDeafult('size', '50px')};
	margin: ${propOrDeafult('m', '0')};
	fill: ${main.colors.color1};
	cursor: pointer;
`;

const Heart = function(props) {
	return (
		<Wrapper m={props.m} onClick={props.onClick}>
			<ConditionalLoader bool={props.isFilled}>
				<HeartSVG/>
				<UnfilledHeart/>
			</ConditionalLoader>
		</Wrapper>
	);
};

export default Heart;
