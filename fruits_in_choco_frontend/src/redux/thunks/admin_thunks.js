import {toggleIsFetching} from "../actions/shop_actions";
import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";

export const addProduct = (product) => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.post('/admin/product', product, true);
    dispatch(reset('product'));
    dispatch(toggleIsFetching(false));
    dispatch(loadProducts());
};