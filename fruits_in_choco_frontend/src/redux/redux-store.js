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
import { reducer as sematable } from 'sematable';

let reducers = combineReducers({
    sematable,
    form: formReducer,
    mainPage: mainReducer,
    appReducer: appReducer,
    authReducer: authReducer,
    adminReducer: adminReducer,
    shopReducer: shopReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer
});

const composeEnhancers = composeWithDevTools({
    trace: true
});

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;