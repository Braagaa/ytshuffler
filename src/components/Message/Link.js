import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import main from '../../style/main';

const Span = styled.span`
	a {
		color: ${main.colors.color1};
		text-decoration: underline;
		transition: all 0.3s ease-out;
	}

	a:hover {
		color: ${main.colors.color2};
	}
`;

export default function(props) {
	return (
		<Span>
			<Link to={props.to}>{props.children}</Link>
		</Span>
	);
};
