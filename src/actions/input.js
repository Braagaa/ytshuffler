export const WRITE = 'WRITE';
export const CLEAR_INPUTS = 'CLEAR_INPUTS';

export const write = (key, input) => ({
	type: WRITE,
	payload: {key, input}
});

export const clearAll = () => ({
	type: CLEAR_INPUTS
});
