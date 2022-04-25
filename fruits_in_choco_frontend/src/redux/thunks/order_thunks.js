import {
    orderMadeSuccess,
    setOrderInfo,
    setOrders,
    toggleIsFetching,
    updateOrderInState
} from "../actions/order_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {clearCart} from "../actions/shop_actions";

export const makeOrder = (order, history) => async dispatch => {
    console.log(order)
    dispatch(toggleIsFetching(true));
    try {
        const response = await RequestService.post("/orders", order);
        dispatch(orderMadeSuccess(response.data));
        dispatch(reset("order"));
        dispatch(clearCart());
        localStorage.removeItem("products");
        history.push("/cart/success");
    } catch (error) {
        dispatch(stopSubmit('order', {_error: error.response.data}))
    } finally {
        dispatch(toggleIsFetching(false));
    }
}

export const loadAllOrders = () => async dispatch => {
    try {
        const response = await RequestService.get("/orders", true);
        dispatch(setOrders(response.data));
    } catch (e) {
        console.log(e)
    }
}

export const loadOrderById = (id) => async dispatch => {
    try {
        const response = await RequestService.get(`/orders/${id}`, true);
        dispatch(setOrderInfo(response.data));
    } catch (e) {
        console.log(e)
    }
}

export const updateOrder = (order) => async dispatch => {
    try {
        const response = await RequestService.put(`/orders/${order.id}`, order, true);
        dispatch(setOrderInfo(response.data));
        dispatch(updateOrderInState(order));
    } catch (e) {
        console.log(e)
    }
}