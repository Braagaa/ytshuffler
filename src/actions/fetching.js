import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from './initialLoad';
import {modalMode} from './modal';
import {tap, reThrow} from '../utils/func';

export const INITIAL_FETCH = 'INITIAL_FETCH';
export const MERGE_FETCHED = 'MERGE_FETCHED';
export const CLEAR_FETCH = 'CLEAR_FETCH';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const fetchStart = () => ({type: FETCHING_BEGIN});
export const fetchInital = () => ({type: INITIAL_FETCH});
export const fetchFail = error => ({type: FETCHING_FAIL, payload: {error}});
export const fetchClear = key => ({type: CLEAR_FETCH});
export const clearError = () => ({type: CLEAR_ERROR});
export const fetchSuccess = key => data => ({
	type: FETCHING_SUCCESS,
	payload: {key, data}
});
export const mergeFetched = (key, data) => ({
	type: MERGE_FETCHED,
	payload: {key, data}
});

const fetchingFunc = initalActionCreator => (apiFn, name, ...args) => dispatch => {
	dispatch(initalActionCreator());
	return apiFn(...args)
		.then(res => res.data)
		.then(tap(data => dispatch(fetchSuccess(name)(data))))
		.catch(reThrow(e => dispatch(fetchFail(e))))
		.catch(reThrow(e => dispatch(modalMode(true, false, e.response.data.error))));
};
export const fetching = fetchingFunc(fetchStart);
export const initalFetch = fetchingFunc(fetchInital);
