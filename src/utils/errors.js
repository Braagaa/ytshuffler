export const ifError = pred => (setFn, message) => error => {
	const {code, message: serverMessage} = error.response.data.error;
	if (pred(code)) {
		return setFn(serverMessage || message);
	}
	throw error;
};

export const ifClientError = ifError(code => code > 399 && code < 500);
export const ifServerError = ifError(code => code > 499);

export const ifAnyError = (setFn, message) => error => {
	const {response: {data}} = error;
	return setFn(message || data.error.message);
};

export const setStateThrow = (fn, ...args) => mainArg => {
	fn(...args);	
	throw mainArg;
};

export const ifErrorStatus = (status, fn) => e => {
	if (e.response.status === status) {
		return fn(e);
	};
	throw e;
};
