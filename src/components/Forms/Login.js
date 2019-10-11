import React from 'react';

import Close from '../Close';
import Input from '../Input';

import {H2} from './style';

export default function(props) {
	return (
		<form className="text-left position-relative">
			<Close exitHandle={props.exitHandle}/>
			<H2>Login</H2>
			<Input text="email"/>
			<Input text="password"/>
			<Input type="submit" text="Login"/>
		</form>
	);
};
