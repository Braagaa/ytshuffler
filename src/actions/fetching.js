import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from './initialLoad';
import {tap} from '../utils/func';

export const CLEAR_FETCH = 'CLEAR_FETCH';

export const fetchStart = () => ({type: FETCHING_BEGIN});
export const fetchFail = error => ({type: FETCHING_FAIL, error});
export const fetchClear = key => ({type: CLEAR_FETCH})
export const fetchSuccess = key => data => ({
	type: FETCHING_SUCCESS,
	payload: {key, data}
});

export const fetching = (apiFn, name, ...args) => dispatch => {
	dispatch(fetchStart());
	return apiFn(...args)
		.then(res => res.data)
		.then(tap(data => dispatch(fetchSuccess(name)(data))))
		.catch(fetchFail);
};
