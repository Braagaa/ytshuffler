import React from 'react';
import {ReactComponent as InfoIcon} from '../../imgs/info-button.svg';
import Tooltip from './';

import main from '../../style/main';

const InfoTooltip = Tooltip(InfoIcon);

export default function(props) {
	return (
		<InfoTooltip fill={main.colors.color6} width="20px" height="20px">
			{props.children}
		</InfoTooltip>
	);
}; 
