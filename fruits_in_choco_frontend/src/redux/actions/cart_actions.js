import {
    ADD_PRODUCT_TO_CART_BEGIN, ADD_PRODUCT_TO_CART_FAILURE, ADD_PRODUCT_TO_CART_LOCALLY, ADD_PRODUCT_TO_CART_SUCCESS,
    CLEAR_CART, DELETE_FROM_CART_BEGIN, DELETE_FROM_CART_FAILURE, DELETE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_LOCALLY,
    UPDATE_PRODUCT_IN_CART, UPDATE_SERVER_CART_BEGIN, UPDATE_SERVER_CART_FAILURE, UPDATE_SERVER_CART_SUCCESS
} from "../action_types/cart_action_types";

export const addToCartLocally = product => ({type: ADD_PRODUCT_TO_CART_LOCALLY, product});
export const addToCartBegin = () => ({type: ADD_PRODUCT_TO_CART_BEGIN});
export const addToCartSuccess = () => ({type: ADD_PRODUCT_TO_CART_SUCCESS});
export const addToCartFailure = error => ({type: ADD_PRODUCT_TO_CART_FAILURE, error});
export const updateServerCartBegin = () => ({type: UPDATE_SERVER_CART_BEGIN});
export const updateServerCartSuccess = () => ({type: UPDATE_SERVER_CART_SUCCESS});
export const updateServerCartFailure = error => ({type: UPDATE_SERVER_CART_FAILURE, error});
export const removeFromCartLocally = id => ({type: REMOVE_FROM_CART_LOCALLY, id});
export const deleteFromCartBegin = () => ({type: DELETE_FROM_CART_BEGIN});
export const deleteFromCartSuccess = () => ({type: DELETE_FROM_CART_SUCCESS});
export const deleteFromCartFailure = (error) => ({type: DELETE_FROM_CART_FAILURE, error});
export const updateProductInCart = (product) => ({type: UPDATE_PRODUCT_IN_CART, product});
export const clearCart = () => ({type: CLEAR_CART});
