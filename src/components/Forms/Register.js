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
import {ifClientError, setStateThrow} from '../../utils/errors';
import {thunk} from '../../utils/func';
import {modalMode} from '../../actions/modal';

import Close from '../Close';
import Input from '../Input';
import Rule from './Rule';
import Loaders from '../Loaders';

import {H2, Form, HideRule} from './style';
import main from '../../style/main';

const emailValidate = validateEmail.validate;
const Loader = Loaders();
const {colors: {color3: redish}} = main;

const regMessage = 'An email will be sent shortly. Click on the link in your email to complete registration!'

const mapStateToProps = storeData => ({
	email: storeData.input.email,
	password: storeData.input.password,
	repeatPassword: storeData.input['repeat password']
});
const mapDispatchToProps = {modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

const validations = [
	[checkUpperCase, '1 capital letter'],
	[checkLowerCase, '1 lowercase letter'],
	[checkNumber, '1 number'],
	[checkSpecialChar, '1 special character'],
	[checkLength, '8 to 20 characters in length']
];

export default connectFunction(function(props) {
	const {email = '', password = '', repeatPassword = '', modalMode} = props;
	const [clientErrorMsg, setClientErrorMsg] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [loading, setLoading] = useState({isLoading: false, message: ''});

	const exitHandle = e => {
		props.exitHandle(e);
		setClientErrorMsg('');
	};

	const onSubmit = e => {
		e.preventDefault();

		if (!emailValidate(email)) return;

		if (fullPasswordCheck(password)) {
			setLoading({isLoading: true, message: 'Registering...'});
			setClientErrorMsg('');
			setDisableSubmit(true);

			registerUser({email, password})
				.then(thunk(setLoading, {isLoading: false, message: ''}))
				.then(thunk(modalMode, true, false, {message: regMessage}))
				.then(thunk(setDisableSubmit, false))
				.then(thunk(exitHandle))
				.catch(setStateThrow(setDisableSubmit, false))
				.catch(setStateThrow(setLoading, {isLoading: false}))
				.catch(ifClientError(setClientErrorMsg));
		}
	};

	return (
		<Loader isLoading={loading.message} message={loading.message} fill={redish}>
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
		</Loader>
	);
});
