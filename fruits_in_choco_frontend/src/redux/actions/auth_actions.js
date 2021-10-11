import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../action_types/auth_action_types";

export const loginSuccess = (userId, email, login, isAuth) => ({type: LOGIN_SUCCESS, payload: {userId, email, login, isAuth}});
export const logoutSuccess = (userId, email, login, isAuth) => ({type: LOGOUT_SUCCESS, payload: {userId, email, login, isAuth}});