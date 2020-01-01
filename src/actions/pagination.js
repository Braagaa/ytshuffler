export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const TO_PAGE = 'TO_PAGE';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const INITIALIZE = 'INITIALIZE';
export const RESET = 'RESET';

export const initalizePage = (itemsPerPage, page, maximumItems, offset) => ({
	type: INITIALIZE,
	payload: {itemsPerPage, page, maximumItems, offset}
});

export const prevPage = (itemsPerPage, page) => ({
	type: PREV_PAGE,
	payload: {itemsPerPage, page}
});

export const nextPage = (itemsPerPage, page, maximumItems) => ({
	type: NEXT_PAGE,
	payload: {itemsPerPage, page, maximumItems}
});

export const toPage = page => ({
	type: TO_PAGE,
	payload: {page}
});

export const currentPage = page => ({
	type: CURRENT_PAGE, 
	payload: {page}
});

export const resetPage = () => ({type: RESET});
