import {SET_PROFILE} from "../action_types/profile_action_types";

const initialState = {
    profile: {},
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default: {
            return state
        }

    }
};

export default profileReducer;