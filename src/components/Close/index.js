import React, {useState} from 'react';
import {connect} from 'react-redux';
import {clearAll} from '../../actions/input';
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

const mapStateToProps = () => ({});
const mapDispatchToProps = {clearAll};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function (props) {
	const [hoverColor, setHoverColor] = useState(colors.color2);

	const handleHover = color => e => setHoverColor(color);
	const handleEnter = handleHover(colors.color3);
	const handleLeave = handleHover(colors.color2);
	const onClick = e => {
		props.exitHandle();
		props.clearAll();
	};

	return (
		<div className="position-relative text-left">
			<Wrapper 
				onMouseEnter={handleEnter} 
				onMouseLeave={handleLeave}
				onClick={onClick}
			>
				<CancelSVG fill={hoverColor}/>
			</Wrapper>
		</div>
	);
});
