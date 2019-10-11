const ifError = (checkRange) => (setFn, message) => error => {
	const {response: {data, status}} = error;
	if (status >= checkRange && status < checkRange + 100) {
		return setFn(message || data.error.message);
	}
	throw error;
};

export const ifAnyError = (setFn, message) => error => {
	const {response: {data}} = error;
	return setFn(message || data.error.message);
};

export const setStateThrow = (fn, ...args) => mainArg => {
	fn(...args);	
	throw mainArg
};

export const if400Error = ifError(400);
