export const isAuthenticatedUser = () => document.cookie
	.split(' ')
	.some(str => str.startsWith('JWT-HP'));

export const setCSRFStorage = res => 
	localStorage.setItem('CSRF', res.headers.csrf);

export const getCSRFStorage = () => localStorage.getItem('CSRF');

export const logoutUser = () => {
	document.cookie = 'JWT-HP=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	localStorage.removeItem('CSRF');
};
