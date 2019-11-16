import React from 'react';
import styled from 'styled-components';

const Hidden = styled.div`
	${props => !props.bool ? 
		`visibility: hidden;
		 height: 0px;
		 width: 0px;` : ''
	}
`;

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

export const ConditionalHidden = function({bool, children, ...props}) {
	const newChildren = React.Children.map(
		children, 
		(child, i) => (
			<Hidden bool={i === 0 ? bool : !bool}>
				{React.cloneElement(child, {...props})}
			</Hidden>
		)
	);

	return (
		<React.Fragment>
			{newChildren}
		</React.Fragment>
	);
};

export const Conditions = function({bools, children, ...props}) {
	const newChildren = React.Children.map(
		children, 
		child => React.cloneElement(child, {...props})
	);

	let index = bools.findIndex(bool => bool);
	index = index === -1 ? newChildren.length - 1 : index;

	return (
		<React.Fragment>
			{newChildren[index]}
		</React.Fragment>
	);
}
