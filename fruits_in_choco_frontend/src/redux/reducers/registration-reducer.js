import {REGISTER_FAILURE, REGISTER_SUCCESS, TOGGLE_IS_FETCHING} from "../action_types/registration_action_types";

const initialState = {
    isRegistered: false,
    isFetching: false,
    errors: {}
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true
            }
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                errors: action.payload,
            }
        }
        default: {
            return state;
        }
    }
};

export default registrationReducer;



