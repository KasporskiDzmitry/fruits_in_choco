import {
    CLEAR_TOKEN,
    FETCH_REFRESH_TOKEN_BEGIN,
    FETCH_REFRESH_TOKEN_FAILURE,
    FETCH_REFRESH_TOKEN_SUCCESS,
    LOGINATION_BEGIN,
    LOGINATION_FAILURE,
    LOGINATION_SUCCESS,
    LOGOUT_BEGIN,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    TOGGLE_IS_FETCHING
} from "../action_types/auth_action_types";

const initialState = {
    isTokenFetching: false,
    isLoginationInProcess: false,
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
        case LOGINATION_BEGIN: {
            return {
                ...state,
                isLoginationInProcess: true
            }
        }
        case LOGINATION_SUCCESS: {
            return {
                ...state,
                isLoginationInProcess: false,
                ...action.payload
            }
        }
        case LOGINATION_FAILURE: {
            return {
                ...state,
                error: action.error,
                isLoginationInProcess: false
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