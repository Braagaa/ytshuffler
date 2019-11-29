import {SEARCH_BEGIN, SEARCH_SUCCESS, SEARCH_FAILED} from '../actions/searchResults';

export default function searchResultReducer(state = {}, action) {
	switch(action.type) {
		case SEARCH_BEGIN: 
			return {
				...state,
				isError: false,
				error: {},
				isLoading: true,
			};
		case SEARCH_SUCCESS:
			return {
				...state,
				isError: false,
				error: {},
				isLoading: false,
				results: action.payload.results
			};
		case SEARCH_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				results: [],
				error: action.payload.error.response.data.error
			};
		default:
			return {
				isLoading: false,
				results: [],
				error: {},
				...state
			};
	}
}
