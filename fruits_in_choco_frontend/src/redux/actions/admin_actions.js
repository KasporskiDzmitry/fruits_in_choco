import {
    NOTIFICATION_RECEIVED,
    NOTIFICATION_WATCHED,
    SET_CATEGORY,
    SET_ORDER,
    SET_ORDERS,
    SET_PRODUCT,
    SET_REVIEW,
    SET_USER,
    SET_USERS,
    UPDATE_ORDER
} from "../action_types/admin_action_types";

export const setUsers = (users) => ({type: SET_USERS, users});
export const setUser = (user) => ({type: SET_USER, user});
export const setProduct = product => ({type: SET_PRODUCT, product});
export const setReview = (review) => ({type: SET_REVIEW, review});
export const notificationReceived = () => ({type: NOTIFICATION_RECEIVED})
export const notificationWatched = () => ({type: NOTIFICATION_WATCHED});
export const setCategory = (category) => ({type: SET_CATEGORY, category});
export const setOrders = orders => ({type: SET_ORDERS, orders});
export const setOrder = order => ({type: SET_ORDER, order});
export const updateOrderInState = order => ({type: UPDATE_ORDER, order})

