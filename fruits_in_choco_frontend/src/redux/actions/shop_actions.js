import {
    SET_CURRENT_PRODUCT,
    SET_CURRENT_PRODUCT_REVIEWS, SET_FILTERED_TYPES,
    SET_PRODUCTS, TOGGLE_IS_FETCHING
} from "../action_types/shop_action_types";

export const setProducts = products => ({type: SET_PRODUCTS, products});
export const setCurrentProduct = currentProduct => ({type: SET_CURRENT_PRODUCT, currentProduct});
export const setCurrentProductReviews = reviews => ({type: SET_CURRENT_PRODUCT_REVIEWS, reviews});
export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFilteredTypes = types => ({type: SET_FILTERED_TYPES, types});