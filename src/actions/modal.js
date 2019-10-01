export const MODAL_OFF = 'MODAL_OFF';
export const MODAL_ON = 'MODAL_ON';

export const modalMode = (on = false, isLoading = false, data = {}) => ({
	type: on ? MODAL_ON : MODAL_OFF,
	payload: {isLoading, data}
});
