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
		const {code} = err.response;
		if (code === 401 || code === 404){
			store.dispatch(modalMode(true, false, {
				message: 'You are unauthorized. Please relogin or register an email.'
			}));
			history.push('/');
		}
	}
};
