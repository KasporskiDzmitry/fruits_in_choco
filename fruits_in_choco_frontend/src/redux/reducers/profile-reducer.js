import {SET_PROFILE} from "../action_types/profile_action_types";

const initialState = {
    profile: null
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