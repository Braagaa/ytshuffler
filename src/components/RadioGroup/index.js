import React from 'react';
import {connect} from 'react-redux';
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

const mapStateToProps = dataStore => ({
	isLoading: dataStore.fetching.isLoading
});
const connectFunction = connect(mapStateToProps);

export default connectFunction(function(props) {
	const onChange = e => {
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
						checked={id === props.checked}
						id={id}
						value={id}
						text={value}
						handler={onChange}
						disabled={props.isLoading}
					/>
				)
			}
		</Wrapper>
	);
});
