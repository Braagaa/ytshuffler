import {INITIALIZE, PREV_PAGE, NEXT_PAGE, CURRENT_PAGE} from '../actions/pagination';
import {getOffset} from '../utils/math';

export default function(storeData = {}, action) {
	const {itemsPerPage, page, maximumItems} = storeData;
	switch (action.type) {
		case INITIALIZE:
			return {
				itemsPerPage: action.payload.itemsPerPage,
				page: action.payload.page,
				maximumItems: action.payload.maximumItems,
				offset: action.payload.offset
			};
		case CURRENT_PAGE:
			return {
				...storeData,
				page: action.payload.page
			};
		case PREV_PAGE:
			return {
				...storeData,
				page: getOffset(itemsPerPage, page) > 0 ? page - 1 : page,
				offset: getOffset(itemsPerPage, page) - itemsPerPage
			};
		case NEXT_PAGE:
			const pred = getOffset(itemsPerPage, page) < 
				maximumItems - itemsPerPage;
			return {
				...storeData,
				page: pred ? page + 1 : page,
				offset: getOffset(itemsPerPage, page) + itemsPerPage
			};
		default:
			return {
				page: 1,
				itemsPerPage: 10,
				maximumItems: 50,
				offset: 0,
				...storeData
			};
	}
}
