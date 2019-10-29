import React from 'react';
import styled from 'styled-components';

import CD from './CD';

const toCSS = obj => Object.entries(obj)
	.reduce((acc, [key, value]) => acc + `${key}: ${value};\n`, '');

const LoaderWrap = styled.div`
	visibility: ${props => props.isLoading ? 'hidden' : 'visible'};
	${({css}) => css ? toCSS(css) : ''}
`;

export default function(LoaderComponent) {
	return function({isLoading, fill, size, css, lm, children}) {
		return (
			<React.Fragment>
				{
					!LoaderComponent ? (
						<CD isLoading={isLoading} size={size} lm={lm} fill={fill}/>
					) : (
						<LoaderComponent isLoading={isLoading} lm={lm} size={size} fill={fill}/>
					)
				}
				<LoaderWrap css={css} isLoading={isLoading}>
					{React.Children.toArray(children)}
				</LoaderWrap>
			</React.Fragment>
		);
	}
};
