import store from '../store';
import {modalMode} from '../actions/modal';
import {stopVideo, openPlayer} from '../actions/player'; 

export const isAuthenticatedUser = () => {
	const checkJWTHP = document.cookie
		.split(' ')
		.some(str => str.startsWith('JWT-HP'));
	const checkCSRFT = localStorage.getItem('CSRF');
	return checkCSRFT && checkJWTHP;
}

export const setCSRFStorage = res => 
	localStorage.setItem('CSRF', res.headers.csrf);

export const getCSRFStorage = () => localStorage.getItem('CSRF');

export const logoutUser = () => {
	document.cookie = 'JWT-HP= ; expires = Thu, 01 Jan 1970 00:00:01 GMT';
	localStorage.removeItem('CSRF');
	store.dispatch(stopVideo());
	store.dispatch(openPlayer(false));
};

export const unauthorized = history => err => {
	if (err.response) {
		const {code, status} = err.response;
		if (code === 401 || code === 404 || status === 401 || status === 404){
			logoutUser();
			store.dispatch(modalMode(true, false, {
				message: 'You are unauthorized. Please relogin or register an email.'
			}));
			history.push('/');
		}
	}
};

export const noChannel = history => ({response}) => {
	const {status} = response;
	if (status === 404) {
		history.replace('/channels');
	};
	if (status === 422) {
		const path = history.location.pathname.split('/');
		store.dispatch(modalMode(true, false, {
			message: `Channel '${path[path.length - 1]}' cannot be found.`
		}));
		history.replace('/channels');
	};
};
