import {PRODUCT_ADDED_SUCCESS, SET_PRODUCT, SET_USERS, TOGGLE_IS_FETCHING} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    product: {},
    isFetching: false,
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
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.product
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: !state.isFetching
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