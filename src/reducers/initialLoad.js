import {FETCHING_SUCCESS} from '../actions/initialLoad';

export default function initialLoadReducer(state = {}, action) {
	switch(action.type) {
		case FETCHING_SUCCESS:
			return {
				...state,
				[action.payload.key]: action.payload.data
			};
		default:
			return state;
	}
};
