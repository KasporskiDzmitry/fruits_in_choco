import {
    SET_REVIEW,
    PRODUCT_ADDED_SUCCESS,
    CATEGORY_ADDED_SUCCESS,
    SET_PRODUCT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    REVIEW_APPROVED_SUCCESS, REVIEW_REJECTED_SUCCESS
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    product: {},
    review: {},
    isFetching: false,
    isProductAddedSuccess: false,
    isCategoryAddedSuccess: false,
    isReviewApprovedSuccess: false,
    isReviewRejectedSuccess: false
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