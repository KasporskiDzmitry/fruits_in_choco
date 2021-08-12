import RequestService from "./RequestService";
import {stopSubmit} from "redux-form";

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initialState = {
    userId: '',
    email: '',
    login: '',
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
               ...action.payload
            }
        }
        default: {
            return state
        }
    }
};

const loginSuccess = (userId, email, login, isAuth) => ({
    type: LOGIN_SUCCESS,
    payload: {userId, email, login, isAuth}
});

const logoutSuccess = (userId, email, login, isAuth) => ({type: LOGOUT_SUCCESS, payload: {userId, email, login, isAuth}});

export const login = (email, password) => async dispatch => {
    try {
        const response = await RequestService.post("/auth/login", {email, password});
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isLoggedIn', 'true');
        dispatch(loginSuccess(response.data.userId, response.data.email, response.data.login, true));
    } catch (error) {
        dispatch(stopSubmit('login', {_error: error.response.data}));
    }
};

export const logout = () => async dispatch => {
    await RequestService.post("/auth/logout", null, true);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    dispatch(logoutSuccess('', '', '', false));
};

export default authReducer;