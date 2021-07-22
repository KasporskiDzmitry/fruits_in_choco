import RequestService from "./RequestService";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getAuthUserData = () => async dispatch => {
    if (localStorage.isLoggedIn) {
        const {email, token, role, userId} = localStorage;
        dispatch(setAuthUserData(userId, email, token, true));
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const response = await RequestService.post("/auth/login", {email, password});
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isLoggedIn', 'true');
        dispatch(getAuthUserData());
    } catch (error) {
        dispatch(stopSubmit('login', {_error: error.response.data}));
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    dispatch(setAuthUserData(null, null, null, false));
}

export default authReducer;