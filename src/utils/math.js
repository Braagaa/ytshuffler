export const getOffset = (itemsPerPage, page) => 
	(itemsPerPage * page) - itemsPerPage;

export const checkValidPage = (page, maxPage) => 
	page < 1 ? 1 :
	page > maxPage ? maxPage : page;
