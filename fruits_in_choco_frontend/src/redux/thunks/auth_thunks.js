import RequestService from "../RequestService";
import {
    loginationBegin,
    loginationFailure,
    loginationSuccess,
    logoutBegin,
    logoutFailure,
    logoutSuccess
} from "../actions/auth_actions";
import {reset, stopSubmit} from "redux-form";
import {removeUserInfoFromLS, saveUserInfoToLS} from "../../components/utils/localStorageFunctions";
import {toggleSignInSignUpPopUp} from "../actions/app_actions";
import {stompClient} from "../../components/utils/stomp";
import {synchronizeCarts} from "./cart_thunks";

export const login = (email, password) => async dispatch => {
    let cart = [];

    dispatch(loginationBegin());
    try {
        const response = await RequestService.post("/auth/login", {email, password});

        cart = response.data.cart;

        saveUserInfoToLS(response.data);
        dispatch(loginationSuccess(
            response.data.id,
            response.data.email,
            response.data.name,
            response.data.role,
            response.data.token,
            true));
        dispatch(reset('login'));
        dispatch(toggleSignInSignUpPopUp());
        dispatch(synchronizeCarts(cart));

        window.location.reload(true)
    } catch (error) {
        console.log(error)
        dispatch(stopSubmit('login', {_error: error.response.data}));
        dispatch(loginationFailure(error));
    }
};

export const logout = () => async dispatch => {
    try {
        dispatch(logoutBegin());
        const response = await RequestService.post("/auth/logout", null, true);
        removeUserInfoFromLS();
        dispatch(logoutSuccess());

        if (stompClient !== null) {
            stompClient.disconnect();
            console.log("Websocket has been disconnected");
        }
    } catch (e) {
        console.log(e)
        dispatch(logoutFailure(e));
    } finally {
        // IS IT SAFE???
        window.location.reload(false)
    }
};
