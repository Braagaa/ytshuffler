import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from '../actions/initialLoad';
import {CLEAR_FETCH, CLEAR_ERROR, MERGE_FETCHED, INITIAL_FETCH, INITIAL_FETCH_SUCCESS, MAP, EXIT} from '../actions/fetching';

const def = {
	initialLoad: true,
	isLoading: true,
	isError: false,
	error: null
};

export default function fetchingReducer(state = def, action) {
	const {key, data} = action.payload || {};
	switch(action.type) {
		case INITIAL_FETCH:
			return {
				...state,
				initialLoad: true,
				isError: false,
				error: null
			};
		case FETCHING_BEGIN:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: null
			};
		case INITIAL_FETCH_SUCCESS:
			return {
				...state,
				initialLoad: false,
				isError: false,
				[key]: data
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
				initialLoad: false,
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
		case MAP:
			return {
				[key]: action.payload.fn(state[key])
			};
		case CLEAR_ERROR:
			return {
				...state,
				isError: false,
				initialLoad: false,
				error: null
			};
		case CLEAR_FETCH || EXIT:
			return def;
		default:
			return state;
	}
};
