import React from 'react';
import {Redirect} from 'react-router-dom';
import {logoutUser} from '../../utils/auth';

export default function(props) {
	logoutUser();

	return (
		<Redirect to="/"/>
	);
};
