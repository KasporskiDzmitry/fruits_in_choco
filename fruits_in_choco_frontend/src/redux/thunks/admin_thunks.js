import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";
import {
    setProduct,
    setUsers,
} from "../actions/admin_actions";
import {setProducts} from "../actions/shop_actions";
import {loadCategories} from "./category_thunks";
import {deleteCategory} from "../actions/category_actions";
import {enqueueSnackbar} from "../actions/app_actions";

/// Products ///

export const addProduct = (product) => async dispatch => {
    try {
        const response = await RequestService.post('/admin/products', product, true);
        dispatch(reset('add_product'));
        dispatch(enqueueSnackbar("Product created successfully", "success"));
        dispatch(loadProducts());
    } catch (e) {
        dispatch(enqueueSnackbar("Error while creating product", "error"));
        console.log(e)
    }
};

export const deleteProductById = id => async dispatch => {
    try {
        const response = await RequestService.delete(`/admin/products/${id}`, true);
        dispatch(loadProducts());
        dispatch(enqueueSnackbar("Product removed successfully", "success"));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing product", "error"));
        console.log(e)
    }
}

export const loadProductByIdAdmin = (id) => async dispatch => {
    try {
        const response = await RequestService.get(`/products/${id}`, true);
        dispatch(setProduct(response.data));
    } catch (e) {
        console.log(e)
    }
}

export const loadProductsAdmin = () => async dispatch => {
    try {
        const response = await RequestService.get('/products', true);
        dispatch(setProducts(response.data));
    } catch (e) {
        console.log(e)
    }
}

/// Reviews ///

export const approveReview = (review, productId) => async dispatch => {
    try {
        const response = await RequestService.put(`/admin/products/${productId}/ratings/${review.id}`, review, true);
        dispatch(enqueueSnackbar("Review approved successfully", "success"));
        dispatch(loadProductByIdAdmin(productId));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while approving review", "error"));
        console.log(e);
    }
}

export const deleteReview = (productId, ratingId) => async dispatch => {
    try {
        const response = await RequestService.delete(`/admin/products/${productId}/ratings/${ratingId}`, true);
        dispatch(enqueueSnackbar("Review removed successfully", "success"));
        dispatch(loadProductByIdAdmin(productId));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing review", "error"));
        console.log(e)
    }
}

/// Categories ///

export const addCategory = (category) => async dispatch => {
    try {
        const response = await RequestService.post('/admin/categories', category, true);
        dispatch(reset('add_category'));
        dispatch(enqueueSnackbar("Category created successfully", "success"));
        dispatch(loadCategories());
    } catch (e) {
        dispatch(enqueueSnackbar("Error while creating category", "error"));
        console.log(e);
    }
}

export const deleteCategoryById = id => async dispatch => {
    try {
        const response = await RequestService.delete(`/admin/categories/${id}`, true);
        dispatch(deleteCategory(id));
        dispatch(enqueueSnackbar("Category removed successfully", "success"));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing category", "error"));
        console.log(e)
    }
}

/// Users ///

export const loadUsers = () => async dispatch => {
    const response = await RequestService.get('/admin/users', true);
    dispatch(setUsers(response.data));
}



