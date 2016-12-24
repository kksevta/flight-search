import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import MainPageModule from 'app/main-page';


const RootReducer = (state = {}, action) => {
    return {
        [MainPageModule.constants.NAME]: MainPageModule.reducer(
            state[MainPageModule.constants.NAME],
            action,
        )
    }
}
const Store = createStore(RootReducer, applyMiddleware(thunk, logger()));
export default Store;