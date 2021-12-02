import {SET_CURRENT_PAGE, SET_DATA} from "../action_types/table_action_types";

export const setData = data => ({type: SET_DATA, data});
export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page})