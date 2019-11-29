import {MODAL_OFF, MODAL_ON} from '../actions/modal';

const defaultState = {
	on: false,
	isLoading: false,
	data: {}
};

export default function modalReducer(state = defaultState, action) {
	switch (action.type) {
		case MODAL_OFF:
			return {
				on: false,
				isLoading: action.payload.isLoading,
				data: {}
			};
		case MODAL_ON:
			return {
				on: true,
				isLoading: action.payload.isLoading,
				data: action.payload.data
			};
		default:
			return state;
	}
};
