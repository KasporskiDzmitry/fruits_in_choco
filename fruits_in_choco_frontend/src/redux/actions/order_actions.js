import {ORDER_MADE_SUCCESS, SET_ORDER_INFO, SET_ORDERS, TOGGLE_IS_FETCHING} from "../action_types/order_action_types";

export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const orderMadeSuccess = order => ({type: ORDER_MADE_SUCCESS, order})
export const setOrders = orders => ({type: SET_ORDERS, orders});
export const setOrderInfo = order => ({type: SET_ORDER_INFO, order});
