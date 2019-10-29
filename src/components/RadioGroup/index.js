import React, {useState} from 'react';
import styled from 'styled-components';
import {handleChecked} from '../../utils/commonEvent';

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
	const [playmodeChecked, setPlaymodeChecked] = useState({});
	const handlePlaymodeChecked = handleChecked(setPlaymodeChecked);
	const checked = playmodeChecked.playmode || props.values[0][0];

	const onChange = e => {
		handlePlaymodeChecked(e);
		props.onChange(e);
	};

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
						checked={id.toLowerCase() === checked.toLowerCase()}
						id={id.toLowerCase()}
						value={id.toLowerCase()}
						text={value}
						handler={onChange}
					/>
				)
			}
		</Wrapper>
	);
};
