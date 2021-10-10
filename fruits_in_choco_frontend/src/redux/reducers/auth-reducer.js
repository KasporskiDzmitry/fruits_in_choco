import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../action_types/auth_action_types";

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

export default authReducer;