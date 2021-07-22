import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import mainReducer from "./main-reducer";

let reducers = combineReducers({
    form: formReducer,
    mainPage: mainReducer,
    appReducer: appReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;