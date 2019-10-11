import React from 'react';
import {Rule} from './style';

export default function(props) {
	const isValid = props.validFn(props.input);

	return (
		<Rule valid={isValid}>{props.children}</Rule>
	);
};
