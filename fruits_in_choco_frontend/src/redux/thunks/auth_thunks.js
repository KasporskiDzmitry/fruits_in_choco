import RequestService from "../RequestService";
import {loginSuccess, logoutSuccess, refreshTokenFailed, refreshTokenSuccess} from "../actions/auth_actions";
import {stopSubmit} from "redux-form";
import {getProfile} from "./profile_thunks";

export const login = (email, password) => async dispatch => {
    try {
        const response = await RequestService.post("/auth/login", {email, password});
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('isLoggedIn', 'true'); // не нужен?

        dispatch(refreshTokenSuccess(response.data.token));
        dispatch(getProfile());
        dispatch(loginSuccess(response.data.userId, response.data.email, 'login', true));
    } catch (error) {
        dispatch(stopSubmit('login', {_error: error.response.data}));
    }
};

export const logout = () => async dispatch => {
    await RequestService.post("/auth/logout", null, true);
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    dispatch(logoutSuccess());
};