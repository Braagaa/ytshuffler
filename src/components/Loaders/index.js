import React from 'react';

import CD from './CD';
/*
const toCSS = obj => Object.entries(obj)
	.reduce((acc, [key, value]) => acc + `${key}: ${value};\n`, '');

const LoaderWrap = styled.div`
	visibility: ${props => props.isLoading ? 'hidden' : 'visible'};
	${props => props.isLoading ? `
		width: 0px;
		height: 0px;
	` : ''}
	${({css}) => css ? toCSS(css) : ''}
`;
*/
export default function(LoaderComponent, hide = true) {
	return function({isLoading, message, fill, size, css, lm, children}) {
		return (
			<React.Fragment>
				{
					!LoaderComponent ? (
						<CD message={message} isLoading={isLoading} size={size} lm={lm} fill={fill}/>
					) : (
						<LoaderComponent isLoading={isLoading} lm={lm} size={size} fill={fill}/>
					)
				}
				{
					!isLoading ? (
						React.Children.toArray(children)
					) : null
				}
			</React.Fragment>
		);
	}
};
