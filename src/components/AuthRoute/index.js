import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {modalMode} from '../../actions/modal';

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
