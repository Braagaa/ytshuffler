import {MODAL_OFF, MODAL_ON} from '../actions/modal';

export default function modalReducer(state = {}, action) {
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
			return {
				on: false,
				isLoading: false,
				data: state
			}
	}
};
