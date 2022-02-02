import {orderMadeSuccess, toggleIsFetching} from "../actions/order_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {clearCart} from "../actions/shop_actions";

export const makeOrder = (order, history) => async dispatch => {
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
    }
    dispatch(toggleIsFetching(false));
}