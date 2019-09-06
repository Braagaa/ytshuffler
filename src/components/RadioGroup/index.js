import React from 'react';
import styled from 'styled-components';
import RadioButton from '../RadioButton';
import Tooltip from '../Tooltip/InfoTooltip';

const Wrapper = styled.fieldset`
	padding: 20px;
	margin-bottom: 1.5em;
`;

const ToolWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.5em;

	h2 {
		margin-right: 10px;
		margin-bottom: 0;
	}
`;

export default function(props) {
	return (
		<Wrapper>
			<ToolWrapper>
				<h2>{props.title}</h2>
				{props.hint && <Tooltip>{props.hint}</Tooltip>}
			</ToolWrapper>
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
