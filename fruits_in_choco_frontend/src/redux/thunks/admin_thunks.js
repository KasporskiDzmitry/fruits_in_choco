// import {toggleIsFetching} from "../actions/shop_actions";
import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";
import {addCategorySuccess, addProductSuccess, setUsers, toggleIsFetching} from "../actions/admin_actions";
import {loadCategories} from "./main_thunks";

export const addProduct = (product) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.post('/admin/product', product, true);
        dispatch(reset('add_product'));
        dispatch(addProductSuccess());
        dispatch(loadProducts());
    } catch (e) {
        console.log(e)
    }
    dispatch(toggleIsFetching());
};

export const addCategory = (category) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.post('/admin/category', category, true);
        dispatch(reset('add_category'));
        dispatch(addCategorySuccess());
        dispatch(loadCategories());
    } catch (e) {
        console.log(e);
    }
    dispatch(toggleIsFetching());
}

export const loadUsers = () => async dispatch => {
    // dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/admin/user', true);
    // dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data));
}