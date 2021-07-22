import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import mainReducer from "./main-reducer";
import adminReducer from "./admin-reducer";

let reducers = combineReducers({
    form: formReducer,
    mainPage: mainReducer,
    appReducer: appReducer,
    adminReducer: adminReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;