export const FETCHING_BEGIN = 'FETCHING_BEGIN';
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS';

export const fetchingSuccess = (key, data) => ({
	type: FETCHING_SUCCESS,
	payload: {key, data}
});
