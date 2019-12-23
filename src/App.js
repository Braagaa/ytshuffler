import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import dataStore from './store';
import ProtectedRoute, {LoggedIn, LoggedInOrNull, LoggedInOrHide} from './components/AuthRoute';
import {isAuthenticatedUser} from './utils/auth';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Search from './views/Search';
import Channels from './views/Channels';
import Songs from './views/Songs';
import Genres from './views/Genres';
import Artists from './views/Artists';
import Artist from './views/Artist';
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
const LoggedInNavBar = LoggedInOrNull(NavBar, isAuthenticatedUser);
const LoggedInPlayer = LoggedInOrHide(Player, isAuthenticatedUser);

export default function App() {
	return (
		<Provider store={dataStore}>
			<div>
				<Router>
					<Route path="/" component={LoggedInNavBar}/>
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
								path="/genres" 
								redirectTo={'/'}
								exact 
								component={Genres}
							/>
							<AuthRoute 
								path="/artists" 
								redirectTo={'/'}
								exact 
								component={Artists}
							/>
							<AuthRoute 
								path="/artists/:artist" 
								redirectTo={'/'}
								exact 
								component={Artist}
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
						<Route path="/" component={LoggedInPlayer}/>
					</MainWrapper>
				</Router>
			</div>
		</Provider>
	);
};
