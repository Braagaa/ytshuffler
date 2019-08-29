import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Search from './views/Search';
import Library from './views/Library';

const MainWrapper = styled.div`
	max-width: 992px;
	padding: 0 20px;
	margin: 0 auto;
`;

export default function App() {
	return (
		<div>
			<Router>
				<NavBar/>
				<MainWrapper>
					<Switch>
						<Route path="/" exact component={Login}/>
						<Route path="/search" exact component={Search}/>
						<Route path="/library" exact component={Library}/>
					</Switch>
				</MainWrapper>
			</Router>
		</div>
	);
};
