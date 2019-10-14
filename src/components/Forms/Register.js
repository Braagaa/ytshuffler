import React, {useState} from 'react';
import {connect} from 'react-redux';
import validateEmail from 'email-validator';
import {
	checkUpperCase, 
	checkLowerCase, 
	checkNumber, 
	checkSpecialChar, 
	checkLength,
	fullPasswordCheck
} from '../../utils/validation';
import {registerUser} from '../../apis/shuffler';
import {if400Error, setStateThrow} from '../../utils/errors';
import {setCSRFStorage} from '../../utils/auth';

import Close from '../Close';
import Input from '../Input';
import Rule from './Rule';

import {H2, Form, HideRule} from './style';

const emailValidate = validateEmail.validate;

const mapStateToProps = storeData => ({
	email: storeData.input.email,
	password: storeData.input.password,
	repeatPassword: storeData.input['repeat password']
});
const connectFunction = connect(mapStateToProps);

const validations = [
	[checkUpperCase, '1 capital letter'],
	[checkLowerCase, '1 lowercase letter'],
	[checkNumber, '1 number'],
	[checkSpecialChar, '1 special character'],
	[checkLength, '8 to 20 characters in length']
];

export default connectFunction(function(props) {
	const {email = '', password = '', repeatPassword = ''} = props;
	const [clientErrorMsg, setClientErrorMsg] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(false);

	const exitHandle = e => {
		props.exitHandle(e);
		setClientErrorMsg('');
	};

	const onSubmit = e => {
		e.preventDefault();

		if (!emailValidate(email)) return;

		if (fullPasswordCheck(password)) {
			setDisableSubmit(true);

			registerUser({email, password})
				.then(setCSRFStorage)
				.then(() => props.history.push('/channels'))
				.catch(setStateThrow(setDisableSubmit, false))
				.catch(if400Error(setClientErrorMsg));
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			<Close exitHandle={exitHandle}/>
			<H2>Sign Up</H2>
			<Input text="email"/>
			<HideRule hide={!email || emailValidate(email)}>
				Email is invalid
			</HideRule>
			<HideRule hide={clientErrorMsg === ''}>
				{clientErrorMsg}
			</HideRule>
			<Input text="password"/>
			<HideRule hide={!password || password === repeatPassword}>
				Passwords do not match
			</HideRule>
			<Input type="password" text="repeat password"/>
			<p>Make sure your password includes the following:</p>
			<ul>
				{
					validations.map(([validFn, message]) => 
						<Rule key={message} validFn={validFn} input={password}>{message}</Rule>
					)
				}
			</ul>
			<Input 
				disabled={disableSubmit} 
				type="submit" 
				text="Sign Up"
			/>
		</Form>
	);
});
