import {SELECT_CATEGORY, SET_CATEGORIES, SET_SLIDES} from "../action_types/main_action_types";

export const setSlides = slides => ({type: SET_SLIDES, slides});
export const setCategories= categories => ({type: SET_CATEGORIES, categories});
export const selectCategory = category => ({type: SELECT_CATEGORY, category});