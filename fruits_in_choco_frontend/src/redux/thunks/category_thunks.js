import RequestService from '../../util/RequestService';
import {
    addCategoryBegin,
    addCategoryFailure,
    addCategorySuccess,
    deleteCategoryBegin,
    deleteCategoryFailure,
    deleteCategorySuccess,
    fetchCategoriesBegin,
    fetchCategoriesFailure,
    fetchCategoriesSuccess,
    fetchCategoryBegin,
    fetchCategoryFailure,
    fetchCategorySuccess,
    updateCategoryBegin,
    updateCategorySuccess,
} from '../actions/category_actions';
import { reset } from 'redux-form';
import { enqueueSnackbar } from '../actions/app_actions';

export const loadCategories = () => async (dispatch) => {
    try {
        dispatch(fetchCategoriesBegin());
        const response = await RequestService.get('/categories');
        dispatch(fetchCategoriesSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchCategoriesFailure(e));
    }
};

export const loadCategoryById = (id) => async (dispatch) => {
    try {
        dispatch(fetchCategoryBegin());
        const response = await RequestService.get(`/categories/${id}`);
        dispatch(fetchCategorySuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchCategoryFailure(e));
    }
};

export const addCategory = (category) => async (dispatch) => {
    try {
        dispatch(addCategoryBegin());
        const response = await RequestService.post(
            '/admin/categories',
            category,
            true
        );
        dispatch(addCategorySuccess(response.data));
        dispatch(reset('add_category'));
        dispatch(enqueueSnackbar('Category created successfully', 'success'));
    } catch (e) {
        dispatch(enqueueSnackbar('Error while creating category', 'error'));
        console.log(e);
        dispatch(addCategoryFailure(e));
    }
};

export const deleteCategoryById = (id) => async (dispatch) => {
    try {
        dispatch(deleteCategoryBegin());
        const response = await RequestService.delete(
            `/admin/categories/${id}`,
            true
        );
        dispatch(deleteCategorySuccess(id));
        dispatch(enqueueSnackbar('Category removed successfully', 'success'));
    } catch (e) {
        dispatch(enqueueSnackbar('Error while removing category', 'error'));
        console.log(e);
        dispatch(deleteCategoryFailure(e));
    }
};

export const updateCategoryThunk = (category) => async (dispatch) => {
    try {
        dispatch(updateCategoryBegin());
        const response = await RequestService.put(
            `/admin/categories/${category.id}`,
            category,
            true
        );
        dispatch(enqueueSnackbar('Category updated successfully', 'success'));
        dispatch(updateCategorySuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(deleteCategoryFailure(e));
    }
};
