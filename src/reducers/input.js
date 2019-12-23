import {WRITE, CLEAR_INPUTS} from '../actions/input';

export default function inputReducer(state = {}, action) {
	switch(action.type) {
		case WRITE:
			return {
				...state,
				[action.payload.key]: action.payload.input
			};
		case CLEAR_INPUTS:
			return {};
		default:
			return state;
	}
};
