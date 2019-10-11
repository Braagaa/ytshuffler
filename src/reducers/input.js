import {WRITE, CLEAR} from '../actions/input';

export default function inputReducer(state = {}, action) {
	switch(action.type) {
		case WRITE:
			return {
				...state,
				[action.payload.key]: action.payload.input
			};
		case CLEAR:
			return {};
		default:
			return state;
	}
};
