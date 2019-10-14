import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../apis/shuffler';
import {ifAnyError, setStateThrow} from '../../utils/errors';
import {setCSRFStorage} from '../../utils/auth';

import Close from '../Close';
import Input from '../Input';

import {H2, Form, HideRule} from './style';

const mapStateToProps = storeData => ({
	email: storeData.input.email,
	password: storeData.input.password
});
const connectFunction = connect(mapStateToProps);

export default connectFunction(function(props) {
	const {email, password} = props;
	const [clientErrorMsg, setClientErrorMsg] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(false);

	const exitHandle = e => {
		props.exitHandle(e);
		setClientErrorMsg('');
	};

	const onSubmit = e => {
		e.preventDefault();

		if (!email || !password) {
			return setClientErrorMsg('Email and password must be filled');
		}

		setDisableSubmit(true);
		loginUser({email, password})
			.then(setCSRFStorage)
			.then(() => props.history.push('/channels'))
			.catch(setStateThrow(setDisableSubmit, false))
			.catch(ifAnyError(setClientErrorMsg));
	};

	return (
		<Form className="text-left position-relative" onSubmit={onSubmit}>
			<Close exitHandle={exitHandle}/>
			<H2>Login</H2>
			<HideRule hide={clientErrorMsg === ''}>
				{clientErrorMsg}
			</HideRule>
			<Input text="email"/>
			<Input text="password"/>
			<Input type="submit" text="Login" disabled={disableSubmit}/>
		</Form>
	);
});
