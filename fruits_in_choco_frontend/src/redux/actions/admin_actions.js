import {
    CATEGORY_ADDED_SUCCESS,
    NOTIFICATION_RECEIVED,
    NOTIFICATION_WATCHED,
    PRODUCT_ADDED_SUCCESS,
    REVIEW_APPROVED_SUCCESS,
    REVIEW_REJECTED_SUCCESS,
    SET_PRODUCT,
    SET_REVIEW,
    SET_USERS
} from "../action_types/admin_action_types";

export const setUsers = (users) => ({type: SET_USERS, users});
export const addProductSuccess = () => ({type: PRODUCT_ADDED_SUCCESS});
export const addCategorySuccess = () => ({type: CATEGORY_ADDED_SUCCESS})
export const setProduct = product => ({type: SET_PRODUCT, product});
export const approveReviewSuccess = () => ({type: REVIEW_APPROVED_SUCCESS})
export const setReview = (review) => ({type: SET_REVIEW, review});
export const rejectReviewSuccess = () => ({type: REVIEW_REJECTED_SUCCESS});
export const notificationReceived = () => ({type: NOTIFICATION_RECEIVED})
export const notificationWatched = () => ({type: NOTIFICATION_WATCHED});
