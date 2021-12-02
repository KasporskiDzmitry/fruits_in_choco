import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./reducers/app-reducer";
import mainReducer from "./reducers/main-reducer";
import adminReducer from "./reducers/admin-reducer";
import authReducer from "./reducers/auth-reducer";
import shopReducer from "./reducers/shop-reducer";
import profileReducer from "./reducers/profile-reducer";
import registrationReducer from "./reducers/registration-reducer";
import tableReducer from "./reducers/table-reducer";

let reducers = combineReducers({
    form: formReducer,
    mainPage: mainReducer,
    appReducer: appReducer,
    authReducer: authReducer,
    adminReducer: adminReducer,
    shopReducer: shopReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    tableReducer: tableReducer
});

const composeEnhancers = composeWithDevTools({
    trace: true
});

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;