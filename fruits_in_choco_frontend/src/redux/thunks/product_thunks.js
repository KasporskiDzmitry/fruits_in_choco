import RequestService from "../RequestService";
import {
    acceptReviewBegin, acceptReviewFailure, acceptReviewSuccess,
    addProductBegin,
    addProductFailure,
    addProductSuccess, addReviewBegin, addReviewFailure, addReviewSuccess,
    deleteProductBegin,
    deleteProductFailure,
    deleteProductSuccess, deleteReviewBegin, deleteReviewFailure, deleteReviewSuccess,
    fetchProductBegin,
    fetchProductFailure,
    fetchProductsBegin,
    fetchProductsFailure,
    fetchProductsSuccess,
    fetchProductSuccess,
    updateProductBegin, updateProductFailure, updateProductSuccess
} from "../actions/product_actions";
import {setProducts} from "../actions/filter_actions";
import {reset} from "redux-form";
import {enqueueSnackbar} from "../actions/app_actions";

export const loadProducts = () => async dispatch => {
    try {
        dispatch(fetchProductsBegin());
        const response = await RequestService.get('/products');
        dispatch(fetchProductsSuccess(response.data));
    } catch (e) {
        dispatch(fetchProductsFailure(e));
        console.log(e)
    }
};

export const loadProductById = id => async dispatch => {
    console.log("LOAD PRODUCT BY ID")
    try {
        dispatch(fetchProductBegin());
        const response = await RequestService.get(`/products/${id}`);
        dispatch(fetchProductSuccess(response.data));
    } catch (e) {
        dispatch(fetchProductFailure(e));
        console.log(e)
    }
};

export const loadProductsByCategories = (categories) => async dispatch => {
    try {
        dispatch(fetchProductsBegin());
        const response = await RequestService.post('/products/search', {categories});
        dispatch(fetchProductsSuccess(response.data));
        dispatch(setProducts(response.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))); // filter products
    } catch (e) {
        dispatch(fetchProductsFailure());
        console.log(e)
    }
};

export const addProduct = (product) => async dispatch => {
    try {
        dispatch(addProductBegin());
        const response = await RequestService.post('/admin/products', product, true);
        dispatch(addProductSuccess(response.data));
        dispatch(reset('add_product'));
        dispatch(enqueueSnackbar("Product created successfully", "success"));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while creating product", "error"));
        dispatch(addProductFailure())
        console.log(e)
    }
};

export const deleteProductById = id => async dispatch => {
    try {
        dispatch(deleteProductBegin());
        const response = await RequestService.delete(`/admin/products/${id}`, true);
        dispatch(deleteProductSuccess(id));
        dispatch(enqueueSnackbar("Product removed successfully", "success"));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing product", "error"));
        dispatch(deleteProductFailure());
        console.log(e)
    }
}

export const updateProductThunk = (product) => async dispatch => {
    try {
        dispatch(updateProductBegin())
        const response = await RequestService.put(`/admin/products/${product.id}`, product, true);
        dispatch(updateProductSuccess(response.data))
        dispatch(enqueueSnackbar("Product updated successfully", "success"));
    } catch (e) {
        dispatch(updateProductFailure())
        console.log(e)
    }
}

/// Reviews ///

export const approveReview = (review, productId) => async dispatch => {
    try {
        dispatch(acceptReviewBegin());
        const response = await RequestService.put(`/admin/products/${productId}/ratings/${review.id}`, review, true);
        dispatch(acceptReviewSuccess());
        dispatch(enqueueSnackbar("Review approved successfully", "success"));
        dispatch(loadProductById(productId)); //TODO: think about updating logic. Is it necessary here?
        dispatch(loadProducts());
        // dispatch(updateProductBegin())
        // dispatch(updateProductSuccess(response.data))
    } catch (e) {
        dispatch(enqueueSnackbar("Error while approving review", "error"));
        dispatch(acceptReviewFailure());
        console.log(e);
    }
}

export const deleteReview = (product, ratingId) => async dispatch => {
    try {
        dispatch(deleteReviewBegin());
        const response = await RequestService.delete(`/admin/products/${product.id}/ratings/${ratingId}`, true);
        dispatch(deleteReviewSuccess());
        dispatch(enqueueSnackbar("Review removed successfully", "success"));
        dispatch(loadProductById(product.id));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing review", "error"));
        dispatch(deleteReviewFailure());
        console.log(e)
    }
}

export const addReview = (review) => async dispatch => {
    try {
        dispatch(addReviewBegin());
        const response = await RequestService.post(`/products/${review.productId}/ratings`, review, true);
        dispatch(addReviewSuccess());
    } catch (e) {
        console.log(e)
        dispatch(addReviewFailure());
    }
};