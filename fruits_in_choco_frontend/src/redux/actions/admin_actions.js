import {
    PRODUCT_ADDED_SUCCESS,
    CATEGORY_ADDED_SUCCESS,
    SET_USERS,
    SET_PRODUCT,
    REVIEW_APPROVED_SUCCESS, SET_REVIEW, REVIEW_REJECTED_SUCCESS, ADD_NOTIFICATION, REMOVE_NOTIFICATION, UPDATE_PRODUCT
} from "../action_types/admin_action_types";

export const setUsers = (users) => ({type: SET_USERS, users});
export const addProductSuccess = () => ({type: PRODUCT_ADDED_SUCCESS});
export const addCategorySuccess = () => ({type: CATEGORY_ADDED_SUCCESS})
export const setProduct = product => ({type: SET_PRODUCT, product});
export const approveReviewSuccess = () => ({type: REVIEW_APPROVED_SUCCESS})
export const setReview = (review) => ({type: SET_REVIEW, review});
export const rejectReviewSuccess = () => ({type: REVIEW_REJECTED_SUCCESS});
export const addNotification = notification => ({type: ADD_NOTIFICATION, notification})
export const removeNotification = id => ({type: REMOVE_NOTIFICATION, id});
