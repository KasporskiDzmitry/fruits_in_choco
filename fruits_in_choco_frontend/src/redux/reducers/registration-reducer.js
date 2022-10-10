import {REGISTER_BEGIN, REGISTER_FAILURE, REGISTER_SUCCESS} from "../action_types/registration_action_types";

const initialState = {
    isRegistered: false,
    isRegistrationFetching: false,
    error: null
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_BEGIN: {
            return {
                ...state,
                isRegistrationFetching: true
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistrationFetching: false,
                isRegistered: true
            }
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                isRegistrationFetching: false,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }
};

export default registrationReducer;



