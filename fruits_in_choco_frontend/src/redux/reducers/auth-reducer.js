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
    LOGOUT_SUCCESS
} from "../action_types/auth_action_types";

const initialState = {
    isTokenFetching: false,
    isLoginInProcess: false,
    isLogoutInProcess: false,
    error: null,
    userId: '',
    email: '',
    name: '',
    role: '',
    token: '',
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_BEGIN: {
            return {
                ...state,
                isLoginInProcess: true
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoginInProcess: false,
                isAuth: true,
                ...action.payload
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                error: action.error,
                isLoginInProcess: false
            }
        }
        case FETCH_REFRESH_TOKEN_BEGIN: {
            return {
                ...state,
                isTokenFetching: true
            }
        }
        case FETCH_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                token: action.token,
                isAuth: true,
                isTokenFetching: false
            }
        }
        case FETCH_REFRESH_TOKEN_FAILURE: {
            return {
                ...state,
                error: action.error,
                isTokenFetching: false
            }
        }
        case LOGOUT_BEGIN: {
            return {
                ...state,
                isLogoutInProcess: true
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLogoutInProcess: false,
                userId: null,
                email: null,
                login: null,
                isAuth: false,
                token: null
            }
        }
        case LOGOUT_FAILURE: {
            return {
                ...state,
                error: action.error,
                isLogoutInProcess: false
            }
        }
        case CLEAR_TOKEN: {
            return {
                ...state,
                token: ""
            }
        }
        default: {
            return state
        }
    }
};

export default authReducer;