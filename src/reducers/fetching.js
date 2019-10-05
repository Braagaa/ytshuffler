import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from '../actions/initialLoad';

export default function fetchingReducer(state = {}, action) {
	switch(action.type) {
		case FETCHING_BEGIN:
			return {
				...state.
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
		default:
			return state;
	}
};
