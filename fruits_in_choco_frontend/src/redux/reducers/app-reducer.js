import {INITIALIZED_SUCCESS, TOGGLE_POPUP, TOGGLE_CART_LAYOUT, TOGGLE_SIGN_IN_SIGN_UP_POPUP} from "../action_types/app_action_types";

const initialState = {
    pathnames: [
        {path: '/', name: 'Главная'},
        {path: '/shop', name: 'Магазин'}
    ],
    initialized: false,
    isSignInSignUpPopUpShow: false,
    isCartLayoutShow: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case TOGGLE_SIGN_IN_SIGN_UP_POPUP: {
            return {
                ...state,
                isSignInSignUpPopUpShow: !state.isSignInSignUpPopUpShow
            }
        }
        case TOGGLE_CART_LAYOUT: {
            return {
                ...state,
                isCartLayoutShow: !state.isCartLayoutShow
            }
        }
        default: {
            return state
        }
    }
};


export default appReducer;