import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from '../actions/initialLoad';
import {CLEAR_FETCH} from '../actions/fetching';

const def = {
	isLoading: false,
	isError: false,
	error: null
};

export default function fetchingReducer(state = def, action) {
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
				[action.payload.key]: action.payload.data
			};
		case FETCHING_FAIL:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload.error
			};
		case CLEAR_FETCH:
			return def;
		default:
			return state;
	}
};
