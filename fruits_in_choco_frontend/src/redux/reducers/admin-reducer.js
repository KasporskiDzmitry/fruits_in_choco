import {
    CATEGORY_ADDED_SUCCESS,
    NOTIFICATION_RECEIVED,
    NOTIFICATION_WATCHED,
    PRODUCT_ADDED_SUCCESS,
    REVIEW_APPROVED_SUCCESS,
    REVIEW_REJECTED_SUCCESS,
    SET_PRODUCT,
    SET_REVIEW,
    SET_USERS,
    SET_USER
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    user: {},
    product: {},
    review: {},
    isNotificationReceived: false,
    isProductAddedSuccess: false,
    isCategoryAddedSuccess: false,
    isReviewApprovedSuccess: false,
    isReviewRejectedSuccess: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_RECEIVED: {
            return {
                ...state,
                isNotificationReceived: true
            }
        }
        case NOTIFICATION_WATCHED: {
            return {
                ...state,
                isNotificationReceived: false
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
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