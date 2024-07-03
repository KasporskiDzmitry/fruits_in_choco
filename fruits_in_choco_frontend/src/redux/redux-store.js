import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./reducers/app-reducer";
import slide_reducer from "./reducers/slide_reducer";
import authReducer from "./reducers/auth-reducer";
import categoryReducer from "./reducers/category-reducer";

let reducers = combineReducers({
    form: formReducer,
    slideReducer: slide_reducer,
    appReducer: appReducer,
    categoryReducer: categoryReducer,
    authReducer: authReducer
});

const composeEnhancers = composeWithDevTools({
    trace: true
});

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;