import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './reducers/app-reducer';
import slide_reducer from './reducers/slide_reducer';
import authReducer from './reducers/auth-reducer';
import categoryReducer from './reducers/category-reducer';
import reviewsSlides_reducer from './reducers/reviewsSlides-reducer';
import modalReducer from './reducers/modalWindow-reducer';

let reducers = combineReducers({
    form: formReducer,
    slideReducer: slide_reducer,
    reviewsSlideReducer: reviewsSlides_reducer,
    appReducer: appReducer,
    categoryReducer: categoryReducer,
    authReducer: authReducer,
    modalReducer: modalReducer,
});

const composeEnhancers = composeWithDevTools({
    trace: true,
});

let store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
