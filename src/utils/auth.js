export const isAuthenticatedUser = () => document.cookie
	.split(' ')
	.some(str => str.startsWith('JWT-HP'));

export const setCSRFStorage = res => 
	localStorage.setItem('CSRF', res.headers.csrf);

export const getCSRFStorage = () => localStorage.getItem('CSRF');
