import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './views/Login';

export default function App() {
	return (
		<div>
			<Router>
				<NavBar/>
				<Switch>
					<Route path="/" exact component={Login}/>
				</Switch>
			</Router>
		</div>
	);
};
