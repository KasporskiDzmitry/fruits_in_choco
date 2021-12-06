import {PRODUCT_ADDED_SUCCESS, CATEGORY_ADDED_SUCCESS, SET_USERS, TOGGLE_IS_FETCHING, SET_PRODUCT} from "../action_types/admin_action_types";

export const setUsers = (users) => ({type: SET_USERS, users});
export const addProductSuccess = () => ({type: PRODUCT_ADDED_SUCCESS});
export const addCategorySuccess = () => ({type: CATEGORY_ADDED_SUCCESS})
export const toggleIsFetching = () => ({type: TOGGLE_IS_FETCHING});
export const setProduct = product => ({type: SET_PRODUCT, product});