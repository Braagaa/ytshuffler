export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const INITIALIZE = 'INITIALIZE';

export const initalizePage = (itemsPerPage, page, maximumItems) => ({
	type: INITIALIZE,
	payload: {itemsPerPage, page, maximumItems}
});

export const prevPage = (itemsPerPage, page) => ({
	type: PREV_PAGE,
	payload: {itemsPerPage, page}
});

export const nextPage = (itemsPerPage, page, maximumItems) => ({
	type: NEXT_PAGE,
	payload: {itemsPerPage, page, maximumItems}
});

export const currentPage = page => ({
	type: CURRENT_PAGE, 
	payload: {page}
});
