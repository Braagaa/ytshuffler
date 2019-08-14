import React, {useState} from 'react';
import styled from 'styled-components';

import {ReactComponent as CancelSVG} from '../../imgs/cancel.svg';
import main from '../../style/main';

const {colors} = main;

const Wrapper = styled.div`
	width: 15px;
	height: 15px;
	right: 0;
	top: 0;
	position: absolute;
	cursor: pointer;
`;

export default function (props) {
	const [hoverColor, setHoverColor] = useState(colors.color2);

	const handleHover = color => e => setHoverColor(color);
	const handleEnter = handleHover(colors.color3);
	const handleLeave = handleHover(colors.color2);

	return (
		<div className="positon-relative text-left">
			<Wrapper 
				onMouseEnter={handleEnter} 
				onMouseLeave={handleLeave}
				onClick={props.exitHandle}
			>
				<CancelSVG fill={hoverColor}/>
			</Wrapper>
		</div>
	);
};
