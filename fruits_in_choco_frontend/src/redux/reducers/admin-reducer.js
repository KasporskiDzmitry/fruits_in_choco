import {
    SET_REVIEW,
    PRODUCT_ADDED_SUCCESS,
    CATEGORY_ADDED_SUCCESS,
    SET_PRODUCT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    REVIEW_APPROVED_SUCCESS, REVIEW_REJECTED_SUCCESS, SET_IS_PRODUCT_FETCHING, ADD_NOTIFICATION, REMOVE_NOTIFICATION
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    product: {},
    review: {},
    notifications: [],
    isProductAddedSuccess: false,
    isCategoryAddedSuccess: false,
    isReviewApprovedSuccess: false,
    isReviewRejectedSuccess: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION: {
            return {
                ...state,
                notifications: [...state.notifications, action.notification]
            }
        }
        case REMOVE_NOTIFICATION: {
            return {
                ...state,
                notifications: state.notifications.filter(i => i.id !== action.id)
            }
        }
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
        case REVIEW_REJECTED_SUCCESS: {
            return {
                ...state,
                isReviewRejectedSuccess: true
            }
        }
        case SET_REVIEW: {
            return {
                ...state,
                review: action.review
            }
        }
        case REVIEW_APPROVED_SUCCESS: {
            return {
                ...state,
                isReviewApprovedSuccess: true
            }
        }
        case PRODUCT_ADDED_SUCCESS: {
            return {
                ...state,
                isProductAddedSuccess: true
            }
        }
        case CATEGORY_ADDED_SUCCESS: {
            return {
                ...state,
                isCategoryAddedSuccess: true
            }
        }
        default: {
            return state
        }
    }
};

export default adminReducer;