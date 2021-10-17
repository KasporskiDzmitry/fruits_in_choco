import RequestService from "../RequestService";
import {loginSuccess, logoutSuccess, refreshTokenSuccess} from "../actions/auth_actions";
import {stopSubmit} from "redux-form";

export const login = (email, password) => async dispatch => {
    try {
        const response = await RequestService.post("/auth/login", {email, password});
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('name', response.data.name);

        dispatch(loginSuccess(
            response.data.id,
            response.data.email,
            response.data.name,
            response.data.role,
            response.data.token,
            true));
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
    dispatch(logoutSuccess());
};

export const refreshToken = () => async dispatch => {
    try {
        const response = await RequestService.post("/auth/refreshToken");
        refreshTokenSuccess(response.data);
    } catch (e) {
        dispatch(logout());
    }
};