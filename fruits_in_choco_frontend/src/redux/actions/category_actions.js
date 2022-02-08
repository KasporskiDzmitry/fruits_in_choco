import {SELECT_CATEGORY, SET_CATEGORIES, SET_CATEGORY} from "../action_types/category_action_types";

export const setCategories= categories => ({type: SET_CATEGORIES, categories});
export const selectCategory = category => ({type: SELECT_CATEGORY, category});
export const setCategory = category => ({type: SET_CATEGORY, category});