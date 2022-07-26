import RequestService from "../RequestService";
import {reset} from "redux-form";
import {loadProducts} from "./shop_thunks";
import {
    setCategory, setOrder, setOrders,
    setProduct, setUser,
    setUsers, updateOrderInState,
} from "../actions/admin_actions";
import {setProducts, updateProduct} from "../actions/shop_actions";
import {loadCategories} from "./category_thunks";
import {deleteCategory, updateCategory} from "../actions/category_actions";
import {enqueueSnackbar} from "../actions/app_actions";
import {loadSlides} from "./main_thunks";

/// Orders ///

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
        dispatch(setOrder(response.data));
    } catch (e) {
        console.log(e)
    }
}

export const updateOrder = (order) => async dispatch => {
    try {
        const response = await RequestService.put(`/orders/${order.id}`, order, true);
        dispatch(setOrder(response.data));
        dispatch(updateOrderInState(order));
    } catch (e) {
        console.log(e)
    }
}

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
        dispatch(updateProduct(response.data));
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

export const updateProductThunk = (product) => async dispatch => {
    try {
        const response = await RequestService.put(`/admin/products/${product.id}`, product, true);
        dispatch(enqueueSnackbar("Product updated successfully", "success"));
        dispatch(updateProduct(response.data));
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
        dispatch(loadProductsAdmin());
    } catch (e) {
        dispatch(enqueueSnackbar("Error while approving review", "error"));
        console.log(e);
    }
}

export const deleteReview = (product, ratingId) => async dispatch => {
    try {
        const response = await RequestService.delete(`/admin/products/${product.id}/ratings/${ratingId}`, true);
        dispatch(enqueueSnackbar("Review removed successfully", "success"));
        dispatch(loadProductByIdAdmin(product.id));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing review", "error"));
        console.log(e)
    }
}

/// Categories ///

export const loadCategoryByIdAdmin = (id) => async dispatch => {
    try {
        const response = await RequestService.get(`/categories/${id}`);
        dispatch(setCategory(response.data));
    } catch (e) {
        console.log(e);
    }
}

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


export const updateCategoryThunk = (category) => async dispatch => {
    try {
        const response = await RequestService.put(`/admin/categories/${category.id}`, category, true);
        dispatch(enqueueSnackbar("Category updated successfully", "success"));
        dispatch(updateCategory(response.data));
    } catch (e) {
        console.log(e)
    }
}

/// Users ///

export const loadUsers = () => async dispatch => {
    const response = await RequestService.get('/admin/users', true);
    dispatch(setUsers(response.data));
}

export const loadUserById = id => async dispatch =>{
    try {
        const response = await RequestService.get(`/admin/users/${id}`, true);
        dispatch(setUser(response.data));
    } catch (e) {
        console.log(e)
    }
}

/// Slider ///

export const saveSlide = (slide) => async dispatch => {
    try {
        const response = await RequestService.post('/slide', slide, true);
        dispatch(loadSlides());
        dispatch(reset("add_slide"));
        dispatch(enqueueSnackbar("Slide saved successfully", "success"));
    } catch (e) {
        dispatch(enqueueSnackbar("Error while saving slide", "error"));
        console.log(e)
    }
}

export const updateSlide = (slide) => async dispatch => {
    try {
        const response = await RequestService.put(`/slide/${slide.id}`, slide, true);
        dispatch(loadSlides());
    } catch (e) {
        console.log(e)
    }
}

export const deleteSlide = (slide) => async dispatch => {
    try {
        const response = await RequestService.delete(`/slide/${slide.id}`, true);
        dispatch(enqueueSnackbar("Slide removed successfully", "success"));
        dispatch(loadSlides());
    } catch (e) {
        dispatch(enqueueSnackbar("Error while removing slide", "error"));
        console.log(e)
    }
}


