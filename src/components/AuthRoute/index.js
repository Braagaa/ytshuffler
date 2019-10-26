import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export default function(auth) {
	return function({redirectTo, path, exact, component, ...rest}) {
		return auth() ? (
			<Route path={path} exact={exact} component={component}/>
		) : (
			<Redirect to={redirectTo}/>
		)
	};
}

