import React from 'react';
import styled from 'styled-components';
import main from '../../style/main';

const visible = props => 
	props.checked ? main.colors.color1 : main.colors.color4;

const Wrapper = styled.div`
	padding: 2px 0;
	position: relative;
`;

const RadioButton = styled.input`
	margin-top: -12.5px;
	top: 50%;
	width: 25px;
	height: 25px;
	position: absolute;
	opacity: 0;
`;

const Label = styled.label`
	display: inline-block;
	color: ${visible};
	padding-left: 80px;
	cursor: pointer;
	font-size: 1.7em;
	margin-bottom: 0px;
	font-weight: 800;

	position: relative;
	::before {
		transition: transform 0.3s ease, background-color 0.3s ease;
		position: absolute;
		margin-top: -12.5px;
		top: 50%;
		left: 0;
		width: 25px;
		height: 25px;
		content: '';
		border-radius: 50%;
		background: ${visible};
		transform: ${props => props.checked ? 'scale(1.3)' : 'scale(1)'};
	}
`;

export default function(props) {
	return (
		<Wrapper>
			<RadioButton 
				id={props.id}
				name={props.name}
				value={props.value || props.id}
				type="radio" 
				checked={props.checked}
				onChange={props.handler}
			/>
			<Label 
				htmlFor={props.id} 
				checked={props.checked}
			>
				{props.text}
			</Label>
		</Wrapper>
	);
};
