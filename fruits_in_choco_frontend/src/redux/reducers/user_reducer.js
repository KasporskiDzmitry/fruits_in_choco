import {
    FETCH_USER_BEGIN,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS, FETCH_USERS_BEGIN, FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS
} from "../action_types/user_action_types";

const initialState = {
    isUsersFetching: false,
    isUserFetching: false,
    error: null,
    users: [],
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_BEGIN: {
            return {
                ...state,
                isUserFetching: true
            }
        }
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                isUserFetching: false
            }
        }
        case FETCH_USER_FAILURE: {
            return {
                ...state,
                error: action.error,
                isUserFetching: false
            }
        }
        case FETCH_USERS_BEGIN: {
            return {
                ...state,
                isUsersFetching: true
            }
        }
        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                users: action.users,
                isUsersFetching: false
            }
        }
        case FETCH_USERS_FAILURE: {
            return {
                ...state,
                error: action.error,
                isUsersFetching: false
            }
        }

        default: {
            return state
        }
    }
}

export default userReducer;