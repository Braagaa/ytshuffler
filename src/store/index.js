import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import pagination from '../reducers/pagination';
import searchResults from '../reducers/searchResults';
import initialLoad from '../reducers/initialLoad';
import modal from '../reducers/modal';
import input from '../reducers/input';
import fetching from '../reducers/fetching';
import player from '../reducers/player';
import select from '../reducers/select';

import {getYotubeTopicIds} from '../apis/shuffler';
import {fetchingSuccess} from '../actions/initialLoad';
import {createYTPlayer} from '../actions/player';

const store = createStore(
	combineReducers({
		pagination, 
		searchResults, 
		initialLoad, 
		modal, 
		input, 
		fetching, 
		player,
		select
	}), 
	applyMiddleware(thunk)
);

export default store;

getYotubeTopicIds()
	.then(res => res.data)
	.then(topicIds => store.dispatch(fetchingSuccess('topicIds', topicIds)))

//Creates youtube player object
store.dispatch(createYTPlayer());
