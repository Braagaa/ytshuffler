import React from 'react';
import styled from 'styled-components';
import RadioButton from '../RadioButton';

const Wrapper = styled.fieldset`
	padding: 20px;
	margin-bottom: 1.5em;
`;

export default function(props) {
	return (
		<Wrapper>
			<h2 className="mb-4">{props.title}</h2>
			{
				props.values.map(([id,value]) => 
					<RadioButton 
						key={id}
						name={props.name} 
						checked={id.toLowerCase() === props.checked}
						id={id.toLowerCase()}
						value={id.toLowerCase()}
						text={value}
						handler={props.handler}
					/>
				)
			}
		</Wrapper>
	);
};
