import {loadProducts} from "./shop-reducer";
import {loadCategories} from "./main-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    pathnames: [
        {path: '/', name: 'Главная'},
        {path: '/shop', name: 'Магазин'}
    ],
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
}
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const init = () => async dispatch => {
    await Promise.all([dispatch(loadCategories())])
    dispatch(initializedSuccess());
};

export default appReducer;