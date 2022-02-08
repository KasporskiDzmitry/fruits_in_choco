import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";
import {
    addCategorySuccess,
    addProductSuccess,
    approveReviewSuccess, rejectReviewSuccess, setProduct,
    setUsers,
    toggleIsFetching
} from "../actions/admin_actions";
import {setProducts} from "../actions/shop_actions";
import {loadCategories} from "./category_thunks";

export const addProduct = (product) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.post('/admin/products', product, true);
        dispatch(reset('add_product'));
        dispatch(addProductSuccess());
        dispatch(loadProducts());
    } catch (e) {
        console.log(e)
    }
    dispatch(toggleIsFetching());
};

export const approveReview = (review, productId) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.put(`/admin/products/${productId}/ratings/${review.id}`, review, true);
        dispatch(approveReviewSuccess());
        dispatch(loadProductByIdAdmin(productId));
        dispatch(toggleIsFetching());
    } catch (e) {
        console.log(e);
    }
}

export const deleteReview = (productId, ratingId) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.delete(`/admin/products/${productId}/ratings/${ratingId}`, true);
        dispatch(rejectReviewSuccess());
        dispatch(loadProductByIdAdmin(productId));
        dispatch(toggleIsFetching());
    } catch (e) {
        console.log(e)
    }
}

export const addCategory = (category) => async dispatch => {
    try {
        dispatch(toggleIsFetching());
        const response = await RequestService.post('/admin/categories', category, true);
        dispatch(toggleIsFetching());
        dispatch(reset('add_category'));
        dispatch(addCategorySuccess());
        dispatch(loadCategories());
    } catch (e) {
        console.log(e);
    }
}

export const loadUsers = () => async dispatch => {
    // dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/admin/users', true);
    // dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data));
}

export const loadProductByIdAdmin = (id) => async dispatch => {
    dispatch(toggleIsFetching());
    try {
        const response = await RequestService.get(`/admin/products/${id}`, true);
        dispatch(setProduct(response.data));
        dispatch(toggleIsFetching());
    } catch (e) {
        console.log(e)
    }
}

export const loadProductsAdmin = () => async dispatch => {
    try {
        const response = await RequestService.get('/admin/products', true);
        dispatch(setProducts(response.data));
        dispatch(toggleIsFetching());
    } catch (e) {
        console.log(e)
    }
}