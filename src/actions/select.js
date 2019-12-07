export const SELECT = 'SELECT';
export const DESELECT = 'DESELECT';
export const CLEAR_SELECT_DATA = 'CLEAR_SELECT_DATA';

export const selectData = data => ({
	type: SELECT,
	payload: {data}
});

export const deselectData = data => ({
	type: DESELECT,
	payload: {data}
});

export const clearData = () =>({
	type: CLEAR_SELECT_DATA
});
