import React from 'react';

export default function(Component, pred) {
	return function({args, bool, ...props}) {
		return pred && pred(args) ? (
			<Component {...props}/>
		) : bool ? (
			<Component {...props}/>
		) : null
	};
};

export const ConditionalLoader = function({bool, children, ...props}) {
	const newChildren = React.Children.map(
		children, 
		child => React.cloneElement(child, {...props})
	);

	return (
		<React.Fragment>
			{
				bool ? [newChildren[0]] : [newChildren[1]]
			}
		</React.Fragment>
	);
};
