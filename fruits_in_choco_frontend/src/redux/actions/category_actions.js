import {
    ADD_CATEGORY_BEGIN,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_BEGIN,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_BEGIN,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_BEGIN,
    FETCH_CATEGORY_FAILURE,
    FETCH_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_BEGIN,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS
} from "../action_types/category_action_types";

export const fetchCategoriesBegin = () => ({type: FETCH_CATEGORIES_BEGIN});
export const fetchCategoriesSuccess = (categories) => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategoriesFailure = (error) => ({type: FETCH_CATEGORIES_FAILURE, error});
export const fetchCategoryBegin = () => ({type: FETCH_CATEGORY_BEGIN});
export const fetchCategorySuccess = (category) => ({type: FETCH_CATEGORY_SUCCESS, category});
export const fetchCategoryFailure = (error) => ({type: FETCH_CATEGORY_FAILURE, error});
export const addCategoryBegin = () => ({type: ADD_CATEGORY_BEGIN});
export const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, category});
export const addCategoryFailure = (error) => ({type: ADD_CATEGORY_FAILURE, error});
export const updateCategoryBegin = () => ({type: UPDATE_CATEGORY_BEGIN});
export const updateCategorySuccess = (category) => ({type: UPDATE_CATEGORY_SUCCESS, category});
export const updateCategoryFailure = (error) => ({type: UPDATE_CATEGORY_FAILURE, error});
export const deleteCategoryBegin = () => ({type: DELETE_CATEGORY_BEGIN});
export const deleteCategorySuccess = (id) => ({type: DELETE_CATEGORY_SUCCESS, id});
export const deleteCategoryFailure = (error) => ({type: DELETE_CATEGORY_FAILURE, error});