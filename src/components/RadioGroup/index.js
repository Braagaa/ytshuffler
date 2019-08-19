import React from 'react';
import styled from 'styled-components';
import RadioButton from '../RadioButton';

const Wrapper = styled.fieldset`
	padding: 20px;
`;

export default function(props) {
	return (
		<Wrapper>
			<h2 className="mb-4">{props.title}</h2>
			{
				props.values.map(value => 
					<RadioButton 
						key={value}
						name={props.name} 
						checked={value.toLowerCase() === props.checked}
						id={value.toLowerCase()}
						value={value.toLowerCase()}
						text={value}
						handler={props.handler}
					/>
				)
			}
		</Wrapper>
	);
};
