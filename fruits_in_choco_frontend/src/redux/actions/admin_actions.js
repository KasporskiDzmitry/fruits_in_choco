import {PRODUCT_ADDED_SUCCESS, SET_USERS} from "../action_types/admin_action_types";

export const setUsers = (users) => ({type: SET_USERS, users});
export const addProductSuccess = () => ({type: PRODUCT_ADDED_SUCCESS});