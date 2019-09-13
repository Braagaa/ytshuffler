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
