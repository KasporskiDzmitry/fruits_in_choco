import RequestService from "../RequestService";
import {setFilteredCategories, setFilteredTypes} from "../actions/shop_actions";
import {deleteCategory, setCategories, setCategory} from "../actions/category_actions";

export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/categories');
        dispatch(setCategories(response.data));
        dispatch(setFilteredCategories(response.data.map(i => i.id)));
    } catch (e) {
        console.log(e)
    }
};

export const loadCategoryById = (id) => async dispatch => {
    try {
        const response = await RequestService.get(`/categories/${id}`);
        dispatch(setCategory(response.data));
    } catch (e) {
        console.log(e);
    }
}
