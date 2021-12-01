import {SET_USERS} from "../action_types/admin_action_types";

const initialState = {
    users: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        default: {
            return state
        }
    }
};

export default adminReducer;