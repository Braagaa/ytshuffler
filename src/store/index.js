import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import paginationReducer from '../reducers/pagination';

export default createStore(paginationReducer, applyMiddleware(thunk));
