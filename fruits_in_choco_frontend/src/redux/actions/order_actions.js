import {ORDER_MADE_SUCCESS, TOGGLE_IS_FETCHING} from "../action_types/order_action_types";

export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const orderMadeSuccess = order => ({type: ORDER_MADE_SUCCESS, order})
