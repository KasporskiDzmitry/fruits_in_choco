import {
    fetchOrderBegin,
    fetchOrderFailure,
    fetchOrdersBegin,
    fetchOrdersFailure,
    fetchOrdersSuccess,
    fetchOrderSuccess,
    makeOrderBegin,
    makeOrderFailure,
    makeOrderSuccess, updateOrderBegin, updateOrderFailure, updateOrderSuccess
} from "../actions/order_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {clearCart} from "../actions/cart_actions";

export const makeOrder = (order, history) => async dispatch => {
    try {
        dispatch(makeOrderBegin());
        const response = await RequestService.post("/orders", order);
        dispatch(makeOrderSuccess(response.data));
        dispatch(reset("order"));
        dispatch(clearCart());
        localStorage.removeItem("products");
        history.push("/cart/success");
    } catch (error) {
        console.log(error)
        dispatch(stopSubmit('order', {_error: error.response.data}))
        dispatch(makeOrderFailure(error));
    }
}

export const loadAllOrders = () => async dispatch => {
    try {
        dispatch(fetchOrdersBegin());
        const response = await RequestService.get("/orders", true);
        dispatch(fetchOrdersSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchOrdersFailure(e));
    }
}

export const loadOrderById = (id) => async dispatch => {
    try {
        dispatch(fetchOrderBegin());
        const response = await RequestService.get(`/orders/${id}`, true);
        dispatch(fetchOrderSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchOrderFailure(e));
    }
}

export const updateOrderThunk = (order) => async dispatch => {
    try {
        dispatch(updateOrderBegin());
        const response = await RequestService.put(`/orders/${order.id}`, order, true);
        dispatch(updateOrderSuccess(response.data));
    } catch (e) {
        console.log(e)
        dispatch(updateOrderFailure(e));
    }
}
