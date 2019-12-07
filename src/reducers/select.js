import {SELECT, DESELECT, CLEAR_SELECT_DATA} from '../actions/select';

export default function selectReducer(state = {}, action) {
	switch (action.type) {
		case SELECT:
			return {
				...state,
				[action.payload.data]: true
			};
		case DESELECT:
			return {
				...state,
				[action.payload.data]: false
			};
		case CLEAR_SELECT_DATA:
			return {};
		default: 
			return state
	};
};
