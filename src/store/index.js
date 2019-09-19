import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import pagination from '../reducers/pagination';
import searchResults from '../reducers/searchResults';

export default createStore(
	combineReducers({pagination, searchResults}), 
	applyMiddleware(thunk)
);
