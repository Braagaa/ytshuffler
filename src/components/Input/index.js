import React, {useState} from 'react';
import {connect} from 'react-redux';
import {write} from '../../actions/input';
import styled from 'styled-components';
import main from '../../style/main';

const {colors} = main;

const P = styled.p`
	margin: 0 0 5px;
	font-size: 0.7em;
	line-height: 1.75;
`;

const Label = styled.label`
	display: block;
	padding: 10px 0 0;
	color: ${colors.color2};
	letter-spacing: 1px;
	font-weight: bold;
	text-transform: uppercase;
`;

const Input = styled.input`
	padding: 10px;
	width: 100%;
	height: 50px;
	border: 2px solid ${props => props.bc};
	background: transparent;
	color: ${colors.color3};
	font-weight: 300;
	font-size: 1.8em;
	outline: none;
`;

const Submit = styled.input`
	margin-top: 2.5em;
	padding: 1.5em;
	width: 100%;
	border: none;
	background: ${colors.color3};
	color: ${colors.color1};
	letter-spacing: 1px;
	font-weight: 800;
	font-size: 1.25em;
	outline: none;
`;

const mapStateToProps = storeData => ({
	input: storeData.input
});
const mapDispatchToProps = {write};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default connectFunction(function(props) {
	const {input} = props;
	const [focusColor, setFocusColor] = useState(colors.color2);

	const handleInput = color => e => setFocusColor(color);
	const handleFocus = handleInput(colors.colors3);
	const handleBlur = handleInput(colors.color2);
	const onChange = e => props.write(props.text, e.target.value);

	return props.type === 'submit' ? (
		<P>
			<Submit disabled={props.disabled} type="submit" value={props.text.toUpperCase()}/>
		</P>
	) : (
		<P>
			<Label>{props.text}</Label>
			<Input 
				type={props.type || props.text} 
				bc={focusColor}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={onChange}
				value={input[props.text] || ''}
			/>
		</P>
	);
});
