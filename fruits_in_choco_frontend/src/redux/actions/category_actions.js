import {DELETE_CATEGORY, SELECT_CATEGORY, SET_CATEGORIES, SET_CATEGORY, UPDATE_CATEGORY} from "../action_types/category_action_types";

export const setCategories= categories => ({type: SET_CATEGORIES, categories});
export const selectCategory = category => ({type: SELECT_CATEGORY, category});
export const setCategory = category => ({type: SET_CATEGORY, category});
export const deleteCategory = id => ({type: DELETE_CATEGORY, id});
export const updateCategory = category => ({type: UPDATE_CATEGORY, category});