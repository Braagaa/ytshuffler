import React from 'react';
import styled from 'styled-components';

import Close from '../Close';
import Input from '../Input';

const H2 = styled.h2`
	margin: 0;
	padding: 0.4em 0 0.3em;
	text-align: center;
	font-weight: 300;
	font-size: 3.5em;
`;

export default function Form(props) {
	return (
		<div className="text-left position-relative">
			<Close exitHandle={props.exitHandle}/>
			<H2>{props.text}</H2>
			{
				props.fields.map(field => 
					<Input 
						key={field.text} 
						text={field.text} 
						type={field.type}
					/>
				)
			}
			<Input type="submit" text={props.text}/>
		</div>
	);
};
