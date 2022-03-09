import {
    ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART,
    SET_CURRENT_PRODUCT,
    SET_CURRENT_PRODUCT_REVIEWS, SET_FILTERED_CATEGORIES, SET_IS_PRODUCT_FETCHING, SET_IS_PRODUCTS_FETCHING,
    SET_PRODUCTS, UPDATE_PRODUCT_IN_CART
} from "../action_types/shop_action_types";

export const setProducts = products => ({type: SET_PRODUCTS, products});
export const setCurrentProduct = currentProduct => ({type: SET_CURRENT_PRODUCT, currentProduct});
export const setCurrentProductReviews = reviews => ({type: SET_CURRENT_PRODUCT_REVIEWS, reviews});
export const setFilteredCategories = categories => ({type: SET_FILTERED_CATEGORIES, categories});
export const addToCart = product => ({type: ADD_TO_CART, product});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, id});
export const updateProductInCart = (product) => ({type: UPDATE_PRODUCT_IN_CART, product});
export const clearCart = () => ({type: CLEAR_CART});
export const setIsProductsFetching = (isFetching) => ({type: SET_IS_PRODUCTS_FETCHING, isFetching})
export const setIsProductFetching = (isFetching) => ({type: SET_IS_PRODUCT_FETCHING, isFetching})