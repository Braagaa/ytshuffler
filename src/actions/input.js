export const WRITE = 'WRITE';
export const CLEAR = 'CLEAR';

export const write = (key, input) => ({
	type: WRITE,
	payload: {key, input}
});

export const clearAll = () => ({
	type: CLEAR
});
