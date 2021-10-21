import RequestService from "../RequestService";
import {loginSuccess, logoutSuccess, refreshTokenSuccess} from "../actions/auth_actions";
import {stopSubmit} from "redux-form";
import {removeUserInfoFromLS, saveUserInfoToLS} from "../../components/utils/localStorageFunctions";

export const login = (email, password) => async dispatch => {
    try {
        const response = await RequestService.post("/auth/login", {email, password});
        saveUserInfoToLS(response.data);

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
    removeUserInfoFromLS();
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