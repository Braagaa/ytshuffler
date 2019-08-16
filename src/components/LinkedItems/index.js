import React from 'react';
import Item from './Item';

export default function(props) {
	return React.Children.map(props.children, ({props}) => 
		<Item key={props.text} {...props}/>
	);
};
