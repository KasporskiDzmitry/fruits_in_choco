import {
    CLEAR_TOKEN,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    TOGGLE_IS_FETCHING
} from "../action_types/auth_action_types";

const initialState = {
    userId: '',
    email: '',
    name: '',
    role: '',
    token: '',
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: !state.isFetching
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                token: action.token
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                userId: null,
                email: null,
                login: null,
                isAuth: false,
                token: null
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