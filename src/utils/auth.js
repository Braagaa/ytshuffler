export const isAuthenticatedUser = () => {
	const jwtHPCookie = document.cookie
		.split(' ')
		.find(str => str.startsWith('JWT-HP'));

	return jwtHPCookie !== undefined;
};
