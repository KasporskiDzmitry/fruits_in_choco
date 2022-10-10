import {
    FETCH_ORDER_BEGIN,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDERS_BEGIN,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDERS_SUCCESS,
    MAKE_ORDER_BEGIN, MAKE_ORDER_FAILURE,
    MAKE_ORDER_SUCCESS, UPDATE_ORDER_BEGIN, UPDATE_ORDER_FAILURE, UPDATE_ORDER_SUCCESS
} from "../action_types/order_action_types";

export const makeOrderBegin = () => ({type: MAKE_ORDER_BEGIN});
export const makeOrderSuccess = (order) => ({type: MAKE_ORDER_SUCCESS, order});
export const makeOrderFailure = (error) => ({type: MAKE_ORDER_FAILURE, error});
export const fetchOrderBegin = () => ({type: FETCH_ORDER_BEGIN});
export const fetchOrderSuccess = (order) => ({type: FETCH_ORDER_SUCCESS, order});
export const fetchOrderFailure = (error) => ({type: FETCH_ORDER_FAILURE, error});
export const fetchOrdersBegin = () => ({type: FETCH_ORDERS_BEGIN});
export const fetchOrdersSuccess = (orders) => ({type: FETCH_ORDERS_SUCCESS, orders});
export const fetchOrdersFailure = (error) => ({type: FETCH_ORDERS_FAILURE, error});
export const updateOrderBegin = () => ({type: UPDATE_ORDER_BEGIN});
export const updateOrderSuccess = (order) => ({type: UPDATE_ORDER_SUCCESS, order});
export const updateOrderFailure = (error) => ({type: UPDATE_ORDER_FAILURE, error});

