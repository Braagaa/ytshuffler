import {INITIALIZE, PREV_PAGE, NEXT_PAGE, CURRENT_PAGE} from '../actions/pagination';
import {getOffset} from '../utils/math';

export default function(storeData, action) {
	const {itemsPerPage, page, maximumItems} = storeData || {};
	switch (action.type) {
		case INITIALIZE:
			return {
				itemsPerPage: action.payload.itemsPerPage,
				page: action.payload.page,
				maximumItems: action.payload.maximumItems
			};
		case CURRENT_PAGE:
			return {
				...storeData,
				page: action.payload.page
			};
		case PREV_PAGE:
			return {
				...storeData,
				page: getOffset(itemsPerPage, page) > 0 ? page - 1 : page
			};
		case NEXT_PAGE:
			const pred = getOffset(itemsPerPage, page) < 
				maximumItems - itemsPerPage;
			return {
				...storeData,
				page: pred ? page + 1 : page 
			};
		default:
			return {
				...storeData,
				page: 0,
				itemsPerPage: 0,
				maximumItems: 0
			};
	}
}
