import {SEARCH_BEGIN, SEARCH_SUCCESS} from '../actions/searchResults';

export default function searchResultReducer(state = {}, action) {
	switch(action.type) {
		case SEARCH_BEGIN: 
			return {
				...state,
				isLoading: true,
			};
		case SEARCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				results: action.payload.results
			};
		default:
			return {
				isLoading: false,
				results: [],
				...state
			};
	}
}
