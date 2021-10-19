import {
    ADD_TO_CART, REMOVE_FROM_CART,
    SET_CURRENT_PRODUCT,
    SET_CURRENT_PRODUCT_REVIEWS, SET_FILTERED_TYPES,
    SET_PRODUCTS, TOGGLE_IS_CART_SHOW, TOGGLE_IS_FETCHING
} from "../action_types/shop_action_types";

export const setProducts = products => ({type: SET_PRODUCTS, products});
export const setCurrentProduct = currentProduct => ({type: SET_CURRENT_PRODUCT, currentProduct});
export const setCurrentProductReviews = reviews => ({type: SET_CURRENT_PRODUCT_REVIEWS, reviews});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFilteredTypes = types => ({type: SET_FILTERED_TYPES, types});
export const addToCart = product => ({type: ADD_TO_CART, product});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, id});
export const toggleIsCartShow = () => ({type: TOGGLE_IS_CART_SHOW});