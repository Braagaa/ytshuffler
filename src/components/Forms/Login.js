import React, {useState} from 'react';
import {connect} from 'react-redux';
import {loginUser, updateAllChannels} from '../../apis/shuffler';
import {ifAnyError, setStateThrow} from '../../utils/errors';
import {setCSRFStorage} from '../../utils/auth';

import Loaders from '../Loaders';
import Close from '../Close';
import Input from '../Input';

import main from '../../style/main';
import {setState} from '../../utils/commonEvent';
import {H2, Form, HideRule} from './style';

const Loader = Loaders();

const mapStateToProps = storeData => ({
	email: storeData.input.email,
	password: storeData.input.password
});
const connectFunction = connect(mapStateToProps);

export default connectFunction(function(props) {
	const {email, password} = props;
	const [clientErrorMsg, setClientErrorMsg] = useState('');
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [loading, setLoading] = useState({
		isLoading: false, 
		message: 'Loading'
	});

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
		setLoading({isLoading: true, message: 'Logging In...'});
		loginUser({email, password})
			.then(setCSRFStorage)
			.then(setState(setLoading, {
				isLoading: true, 
				message: 'Updating Channels...'
			}))
			.then(updateAllChannels)
			.then(() => props.history.push('/channels'))
			.catch(setStateThrow(setDisableSubmit, false))
			.catch(ifAnyError(setClientErrorMsg));
	};

	return (
		<Loader isLoading={loading.isLoading} message={loading.message} fill={main.colors.color3}>
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
		</Loader>
	);
});
