import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from './initialLoad';
import {modalMode} from './modal';
import {tap, reThrow} from '../utils/func';

export const INITIAL_FETCH = 'INITIAL_FETCH';
export const INITIAL_FETCH_SUCCESS = 'INITIAL_FETCH_SUCCESS';
export const MERGE_FETCHED = 'MERGE_FETCHED';
export const CLEAR_FETCH = 'CLEAR_FETCH';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const MAP = 'MAP';
export const EXIT = 'EXIT';

export const fetchStart = () => ({type: FETCHING_BEGIN});
export const fetchInital = () => ({type: INITIAL_FETCH});
export const fetchFail = error => ({type: FETCHING_FAIL, payload: {error}});
export const fetchClear = key => ({type: CLEAR_FETCH});
export const clearError = () => ({type: CLEAR_ERROR});
export const exit = () => ({type: EXIT});
export const fetchSuccess = key => data => ({
	type: FETCHING_SUCCESS,
	payload: {key, data}
});
export const initalFetchSuccess = key => data => ({
	type: INITIAL_FETCH_SUCCESS,
	payload: {key, data}
});
export const mergeFetched = (key, data) => ({
	type: MERGE_FETCHED,
	payload: {key, data}
});
export const mapFetched = (key, fn) => ({
	type: MAP,
	payload: {key, fn}
});

const fetchingFunc = (initalActionCreator, endingActionCreator) => (apiFn, name, ...args) => dispatch => {
	dispatch(initalActionCreator());
	return apiFn(...args)
		.then(res => res.data)
		.then(tap(data => dispatch(endingActionCreator(name)(data))))
		.catch(reThrow(e => dispatch(fetchFail(e))))
		.catch(reThrow(e => dispatch(modalMode(true, false, e.response.data.error))));
};
export const fetching = fetchingFunc(fetchStart, fetchSuccess);
export const initalFetch = fetchingFunc(fetchInital, initalFetchSuccess);
