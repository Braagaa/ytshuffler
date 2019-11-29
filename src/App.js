import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import dataStore from './store';
import ProtectedRoute, {LoggedIn} from './components/AuthRoute';
import {isAuthenticatedUser} from './utils/auth';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Search from './views/Search';
import Channels from './views/Channels';
import Songs from './views/Songs';
import Settings from './views/Settings';
import NoMatch from './views/404';
import Player from './components/Player/';
import Logout from './components/Logout';

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
					<Route path="/" component={NavBar}/>
					<MainWrapper>
						<Switch>
							<LoggedIn 
								path="/" 
								redirectTo={'/channels'}
								exact 
								auth={isAuthenticatedUser}
								component={Login}
							/>
							<AuthRoute 
								path="/search" 
								redirectTo={'/'}
								exact 
								component={Search}
							/>
							<AuthRoute 
								path="/settings" 
								redirectTo={'/'}
								exact 
								component={Settings}
							/>
							<AuthRoute 
								path="/channels" 
								redirectTo={'/'}
								exact 
								component={Channels}
							/>
							<AuthRoute 
								path="/channels/:id" 
								redirectTo={'/'}
								exact 
								component={Songs}
							/>
							<AuthRoute 
								path="/signout" 
								redirectTo={'/'}
								exact 
								component={Logout}
							/>
							<Route path="*" component={NoMatch}/>
						</Switch>
						<Player/>
					</MainWrapper>
				</Router>
			</div>
		</Provider>
	);
};
