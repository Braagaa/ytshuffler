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
			return getOffset(itemsPerPage, page) > 0 ? {
				...storeData,
				page: page - 1,
				offset: getOffset(itemsPerPage, page) - itemsPerPage
			} : storeData;
		case NEXT_PAGE:
			const pred = getOffset(itemsPerPage, page) < 
				maximumItems - itemsPerPage;
			return pred ? {
				...storeData,
				page: page + 1,
				offset: getOffset(itemsPerPage, page) + itemsPerPage
			} : storeData;
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
