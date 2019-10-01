import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import pagination from '../reducers/pagination';
import searchResults from '../reducers/searchResults';
import initialLoad from '../reducers/initialLoad';
import modal from '../reducers/modal';

import {getYotubeTopicIds} from '../apis/shuffler';
import {fetchingSuccess} from '../actions/initialLoad';

const store = createStore(
	combineReducers({pagination, searchResults, initialLoad, modal}), 
	applyMiddleware(thunk)
);

export default store;

getYotubeTopicIds()
	.then(res => res.data)
	.then(topicIds => store.dispatch(fetchingSuccess('topicIds', topicIds)))
