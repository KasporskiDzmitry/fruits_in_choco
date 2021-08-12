import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import mainReducer from "./main-reducer";
import adminReducer from "./admin-reducer";
import authReducer from "./auth-reducer";
import shopReducer from "./shop-reducer";
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
    form: formReducer,
    mainPage: mainReducer,
    appReducer: appReducer,
    authReducer: authReducer,
    adminReducer: adminReducer,
    shopReducer: shopReducer,
    profileReducer: profileReducer
})

const composeEnhancers = composeWithDevTools({
    trace: true
})

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;