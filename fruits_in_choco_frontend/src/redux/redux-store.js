import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./reducers/app-reducer";
import slide_reducer from "./reducers/slide_reducer";
import authReducer from "./reducers/auth-reducer";
import profileReducer from "./reducers/profile-reducer";
import registrationReducer from "./reducers/registration-reducer";
import { reducer as sematable } from 'sematable';
import orderReducer from "./reducers/order-reducer";
import categoryReducer from "./reducers/category-reducer";
import productReducer from "./reducers/product-reducer";
import cartReducer from "./reducers/cart_reducer";
import filterReducer from "./reducers/filter_reducer";
import userReducer from "./reducers/user_reducer";

let reducers = combineReducers({
    sematable,
    form: formReducer,
    slideReducer: slide_reducer,
    appReducer: appReducer,
    authReducer: authReducer,
    categoryReducer: categoryReducer,
    profileReducer: profileReducer,
    registrationReducer: registrationReducer,
    orderReducer: orderReducer,
    productReducer: productReducer,
    cartReducer: cartReducer,
    filterReducer: filterReducer,
    userReducer: userReducer
});

const composeEnhancers = composeWithDevTools({
    trace: true
});

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;