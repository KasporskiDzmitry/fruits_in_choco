import {FETCH_PROFILE_BEGIN, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS} from "../action_types/profile_action_types";

const initialState = {
    isProfileFetching: false,
    error: null,
    profile: {}
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_BEGIN: {
            return {
                ...state,
                isProfileFetching: true
            }
        }
        case FETCH_PROFILE_SUCCESS: {
            return {
                ...state,
                isProfileFetching: false,
                profile: action.profile
            }
        }
        case FETCH_PROFILE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isProfileFetching: false
            }
        }
        default: {
            return state
        }

    }
};

export default profileReducer;