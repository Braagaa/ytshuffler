import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {modalMode} from '../../actions/modal';

const Hide = styled.div`
	opacity: ${props => props.auth ? '0' : '1'};
	visibility: ${props => props.auth ? 'hidden' : 'visible'};
`;

const mapStateToProps = storeData => ({});
const mapDispatchToProps = {modalMode};
const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export default function(auth) {
	return connectFunction(function({redirectTo, path, exact, component, ...rest}) {
		if (auth()) {
			return <Route path={path} exact={exact} component={component}/>;
		}

		rest.modalMode(true, false, {
			message: 'You are unauthorized. Please relogin or register an email.'
		});

		return <Redirect to={redirectTo}/>;
	});
};

export const LoggedIn = function({redirectTo, path, exact, component, auth}) {
	return auth() ? (
		<Redirect to={redirectTo}/>
	) : (
		<Route path={path} exact={exact} component={component}/>
	);
};

export const LoggedInOrNull = function(Component, auth) {
	return function(props) {
		return auth() ? (
			<Component {...props}/>
		) : null;
	};
};

export const LoggedInOrHide = function(Component, auth) {
	return function(props) {
		return (
			<Hide auth={!auth()}>
				<Component {...props}/>
			</Hide>
		);
	};
};
