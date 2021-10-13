import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from "../action_types/auth_action_types";

export const loginSuccess = (userId, email, login, isAuth) => ({type: LOGIN_SUCCESS, payload: {userId, email, login, isAuth}});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const refreshTokenSuccess = token => ({type: REFRESH_TOKEN_SUCCESS, token});
