import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN_SUCCESS} from "../action_types/auth_action_types";

export const loginSuccess = (userId, email, name, role, token, isAuth) => ({type: LOGIN_SUCCESS, payload: {userId, email, name, role, token, isAuth}});
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const refreshTokenSuccess = token => ({type: REFRESH_TOKEN_SUCCESS, token});
