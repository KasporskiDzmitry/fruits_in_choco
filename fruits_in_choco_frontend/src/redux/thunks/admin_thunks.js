import {toggleIsFetching} from "../actions/shop_actions";
import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";
import {addProductSuccess, setUsers} from "../actions/admin_actions";

export const addProduct = (product) => async dispatch => {
    dispatch(toggleIsFetching(true));
    try {
        const response = await RequestService.post('/admin/product', product, true);
        dispatch(reset('product'));
        dispatch(addProductSuccess());
        dispatch(loadProducts());
    } catch (e) {
        console.log(e)
    }
    dispatch(toggleIsFetching(false));
};

export const loadUsers = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/admin/user', true);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data));
}