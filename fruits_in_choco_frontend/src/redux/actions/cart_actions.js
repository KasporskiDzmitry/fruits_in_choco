import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_PRODUCT_IN_CART} from "../action_types/cart_action_types";

export const addToCart = product => ({type: ADD_TO_CART, product});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, id});
export const updateProductInCart = (product) => ({type: UPDATE_PRODUCT_IN_CART, product});
export const clearCart = () => ({type: CLEAR_CART});