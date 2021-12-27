import {
    INITIALIZED_SUCCESS,
    TOGGLE_CART_LAYOUT,
    TOGGLE_SIGN_IN_SIGN_UP_POPUP
} from "../action_types/app_action_types";

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const toggleSignInSignUpPopUp = () => ({type: TOGGLE_SIGN_IN_SIGN_UP_POPUP});
export const toggleCartLayout = () => ({type: TOGGLE_CART_LAYOUT});
