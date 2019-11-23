import React from 'react';

import {Message} from '../Results/styles';

import {Wrapper, LogoWrapper} from './style';
import {ReactComponent as Logo404} from '../../imgs/404.svg';

export default function(props) {
	return (
		<Wrapper>
			<LogoWrapper>
				<Logo404/>
			</LogoWrapper>
			<Message fs="3em" fw="bold">Errr.... Wrong!!!</Message>
		</Wrapper>
	);
};
