import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './views/Login';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Login}/>
			</Switch>
		</Router>
	);
};
