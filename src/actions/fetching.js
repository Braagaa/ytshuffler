import {FETCHING_BEGIN, FETCHING_SUCCESS, FETCHING_FAIL} from './initialLoad';
import {getChannels} from '../apis/shuffler';

export const fetchStart = () => ({type: FETCHING_BEGIN});
export const fetchFail = error => ({type: FETCHING_FAIL, error});
export const fetchSuccess = key => data => ({
	type: FETCHING_SUCCESS,
	payload: {key, data}
});

export const fetching = (apiFn, name, ...args) => dispatch => {
	dispatch(fetchStart());
	return apiFn(...args)
		.then(fetchSuccess(name))
		.catch(fetchFail);
};

export const fetchMyChannels = fetching(getChannels, 'channels');
