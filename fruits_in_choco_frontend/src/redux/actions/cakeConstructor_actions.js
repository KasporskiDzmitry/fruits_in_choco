import {SET_CAKE, SET_DATA, TOGGLE_IS_FETCHING} from "../action_types/cakeConstructor_action_types";

export const setData = (data) => ({type: SET_DATA, data});
export const setCake = (cake) => ({type: SET_CAKE, cake});
export const toggleIsFetching = () => ({type: TOGGLE_IS_FETCHING})