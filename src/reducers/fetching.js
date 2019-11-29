import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from '../actions/initialLoad';
import {CLEAR_FETCH, CLEAR_ERROR, MERGE_FETCHED} from '../actions/fetching';

const def = {
	isLoading: false,
	isError: false,
	error: null
};

export default function fetchingReducer(state = def, action) {
	const {key, data} = action.payload || {};
	switch(action.type) {
		case FETCHING_BEGIN:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: null
			};
		case FETCHING_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				[key]: data
			};
		case FETCHING_FAIL:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload.error.response.data.error
			};
		case MERGE_FETCHED:
			return {
				...state,
				[key]: {
					...state[key],
					...data
				}
			};
		case CLEAR_ERROR:
			return {
				...state,
				isError: false,
				error: null
			};
		case CLEAR_FETCH:
			return def;
		default:
			return state;
	}
};
