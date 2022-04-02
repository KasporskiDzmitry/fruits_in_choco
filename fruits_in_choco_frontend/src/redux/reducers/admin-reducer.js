import {
    SET_REVIEW,
    PRODUCT_ADDED_SUCCESS,
    CATEGORY_ADDED_SUCCESS,
    SET_PRODUCT,
    SET_USERS,
    REVIEW_APPROVED_SUCCESS,
    REVIEW_REJECTED_SUCCESS,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION, NOTIFICATION_RECEIVED, NOTIFICATION_READ,
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
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
        case NOTIFICATION_READ: {
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