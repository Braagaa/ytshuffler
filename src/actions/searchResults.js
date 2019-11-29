import {getYoutubeSearchChannels, getYoutubeChannels} from '../apis/shuffler';
import {spliceInto} from '../utils/func';
import {modalMode} from './modal';
import {reThrow} from '../utils/func';

export const SEARCH_BEGIN = 'SEARCH_RESULTS_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export const searchBegin = () => ({
	type: SEARCH_BEGIN,
});

export const setResults = results => ({
	type: SEARCH_SUCCESS,
	payload: {results}
});

export const setError = error => ({
	type: SEARCH_FAILED,
	payload: {error}
});

const actionCreatorToDispatch = (actionCreator, dispatchFn) => result =>
	dispatchFn(actionCreator(result));
const pathItems = res => res.data.items;

const getChannelIds = (channels, start, itemsPerPage) => channels
	.slice(start, itemsPerPage)
	.filter(channel => channel.kind === 'youtube#searchResult')
	.map(channel => channel.id.channelId)
	.join(',');

export const getSearchResults = (query, itemsPerPage) => dispatch => {
	if (query) {
		dispatch(searchBegin());
		return getYoutubeSearchChannels(query)
			.then(pathItems)
			.then(items => getChannels(items, 0, 1, itemsPerPage))
			.then(actionCreatorToDispatch(setResults, dispatch))
			.catch(reThrow(actionCreatorToDispatch(setError, dispatch)))
			.catch(reThrow(e => dispatch(modalMode(true, false, e.response.data.error))));
	}
	return dispatch(setResults([]));
};

export const getChannels = (items, offset, page, itemsPerPage) => 
	getYoutubeChannels(getChannelIds(items, offset, itemsPerPage * page))
		.then(pathItems)
		.then(spliceInto(items, offset, itemsPerPage));

export const checkToChannels = (items, offset, page, itemsPerPage) => dispatch => {
	const channelIds = getChannelIds(items, offset, offset + itemsPerPage);

	if (channelIds) {
		dispatch(searchBegin());
		return getYoutubeChannels(channelIds)
			.then(pathItems)
			.then(spliceInto(items, offset, itemsPerPage))
			.then(actionCreatorToDispatch(setResults, dispatch))
			.catch(reThrow(actionCreatorToDispatch(setError, dispatch)))
			.catch(reThrow(e => dispatch(modalMode(true, false, e.response.data.error))));
	}
};
