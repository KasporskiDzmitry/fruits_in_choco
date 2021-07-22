import RequestService from "./RequestService";
import {stopSubmit} from "redux-form";

const SET_IS_ADMIN_LOGGED_IN = 'SET_IS_ADMIN_LOGGED_IN';



const initialState = {
    isAdminLoggedIn: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_ADMIN_LOGGED_IN: {
            return {
                ...state,
                isAdminLoggedIn: action.isLoggedIn
            }
        }
        default: {
            return state
        }
    }
}

export const setIsAdminLoggedIn = isLoggedIn => ({type: SET_IS_ADMIN_LOGGED_IN, isLoggedIn});


export const getAuthData = () => async dispatch => {
    if (localStorage.isLoggedIn) {
        dispatch(setIsAdminLoggedIn(true));
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
        dispatch(getAuthData());
    } catch (error) {
        dispatch(stopSubmit('login', {_error: error.response.data}));
    }

}

export default adminReducer;