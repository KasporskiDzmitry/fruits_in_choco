import RequestService from "../RequestService";
import {loginSuccess, logoutSuccess, toggleIsFetching} from "../actions/auth_actions";
import {reset, stopSubmit} from "redux-form";
import {removeUserInfoFromLS, saveUserInfoToLS} from "../../components/utils/localStorageFunctions";
import {toggleSignInSignUpPopUp} from "../actions/app_actions";
import {synchronizeCarts} from "./shop_thunks";
import {stompClient} from "../../components/utils/stomp";

export const login = (email, password) => async dispatch => {
    let cart = [];

    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.post("/auth/login", {email, password});

        cart = response.data.cart;

        saveUserInfoToLS(response.data);
        dispatch(loginSuccess(
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
    } finally {
        dispatch(toggleIsFetching());

        // IS IT SAFE???
    }
};

export const logout = () => async dispatch => {
    try {
        const response = await RequestService.post("/auth/logout", null, true);
        removeUserInfoFromLS();
        dispatch(logoutSuccess());

        if (stompClient !== null) {
            stompClient.disconnect();
            console.log("Websocket has been disconnected");
        }
    } catch (e) {
        console.log(e)
    } finally {
        // IS IT SAFE???
        window.location.reload(false)
    }


};
