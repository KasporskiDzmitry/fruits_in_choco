import {
    CLEAR_TOKEN,
    FETCH_REFRESH_TOKEN_BEGIN,
    FETCH_REFRESH_TOKEN_FAILURE,
    FETCH_REFRESH_TOKEN_SUCCESS,
    LOGIN_BEGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_BEGIN,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
} from '../action_types/auth_action_types';

export const loginBegin = () => ({type: LOGIN_BEGIN});
export const loginSuccess = (userId, email, name, role, token, isAuth) => ({
    type: LOGIN_SUCCESS,
    payload: {userId, email, name, role, token, isAuth},
});
export const loginFailure = (error) => ({type: LOGIN_FAILURE, error});
export const logoutBegin = () => ({type: LOGOUT_BEGIN});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const logoutFailure = (error) => ({type: LOGOUT_FAILURE, error});
export const fetchRefreshTokenBegin = () => ({
    type: FETCH_REFRESH_TOKEN_BEGIN,
});
export const fetchRefreshTokenSuccess = (token) => ({
    type: FETCH_REFRESH_TOKEN_SUCCESS,
    token,
});
export const fetchRefreshTokenFailure = (error) => ({
    type: FETCH_REFRESH_TOKEN_FAILURE,
    error,
});
export const clearToken = () => ({type: CLEAR_TOKEN});
