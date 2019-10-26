import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import dataStore from './store';
import ProtectedRoute from './components/AuthRoute';
import {isAuthenticatedUser} from './utils/auth';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Search from './views/Search';
import Channels from './views/Channels';
import Songs from './views/Songs';
import Settings from './views/Settings';
import Player from './components/Player/';

const MainWrapper = styled.div`
	max-width: 992px;
	padding: 0 20px;
	margin: 0 auto;
`;

const AuthRoute = ProtectedRoute(isAuthenticatedUser);

export default function App() {
	return (
		<Provider store={dataStore}>
			<div>
				<Router>
					<NavBar/>
					<MainWrapper>
						<Switch>
							<Route path="/" exact component={Login}/>
							<Route path="/search" exact component={Search}/>
							<Route path="/settings" exact component={Settings}/>
							<AuthRoute 
								path="/channels" 
								redirectTo={'/'}
								exact 
								component={Channels}
							/>
							<Route path="/channels/songs" exact component={Songs}/>
						</Switch>
						<Player/>
					</MainWrapper>
				</Router>
			</div>
		</Provider>
	);
};
