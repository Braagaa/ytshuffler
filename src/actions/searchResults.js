import {getYoutubeSearchChannels, getYoutubeChannels} from '../apis/shuffler';
import {spliceInto} from '../utils/func';

export const SEARCH_BEGIN = 'SEARCH_RESULTS_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_RESULTS_SUCCESS';

export const searchBegin = () => ({
	type: SEARCH_BEGIN,
});

export const setResults = results => ({
	type: SEARCH_SUCCESS,
	payload: {results}
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
	dispatch(searchBegin());
	return getYoutubeSearchChannels(query)
		.then(pathItems)
		.then(items => getChannels(items, 0, 1, itemsPerPage))
		.then(actionCreatorToDispatch(setResults, dispatch));
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
			.then(actionCreatorToDispatch(setResults, dispatch));
	}
};
