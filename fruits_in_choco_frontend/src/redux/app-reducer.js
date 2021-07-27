import RequestService from "./RequestService";
import {loadProducts} from "./shop-reducer";
import {loadCategories} from "./main-reducer";

const SET_CATEGORIES = 'SET_CATEGORIES';
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
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

const setCategories= categories => ({type: SET_CATEGORIES, categories});

export const init = () => async dispatch => {
    await Promise.all([dispatch(loadCategories()), dispatch(loadProducts())])
    dispatch(initializedSuccess());
};

export default appReducer;