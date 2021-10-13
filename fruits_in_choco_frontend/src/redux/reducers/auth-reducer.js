import {LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKEN_SUCCESS} from "../action_types/auth_action_types";

const initialState = {
    userId: '',
    email: '',
    login: '',
    isAuth: false,
    token: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default: {
            return state
        }
    }
};

export default authReducer;