import {
    CLEAR_TOKEN,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    TOGGLE_IS_FETCHING
} from "../action_types/auth_action_types";

export const loginSuccess = (userId, email, name, role, token, isAuth) => ({type: LOGIN_SUCCESS, payload: {userId, email, name, role, token, isAuth}});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const refreshTokenSuccess = token => ({type: REFRESH_TOKEN_SUCCESS, token});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const clearToken = () => ({type: CLEAR_TOKEN});

