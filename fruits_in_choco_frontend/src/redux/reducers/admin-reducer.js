import {PRODUCT_ADDED_SUCCESS, SET_USERS} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    isProductAddedSuccess: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case PRODUCT_ADDED_SUCCESS: {
            return {
                ...state,
                isProductAddedSuccess: true
            }
        }
        default: {
            return state
        }
    }
};

export default adminReducer;