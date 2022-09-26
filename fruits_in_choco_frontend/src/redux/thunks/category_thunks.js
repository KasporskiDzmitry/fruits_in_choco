import RequestService from "../RequestService";
import {setCategories} from "../actions/category_actions";

export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/categories');
        dispatch(setCategories(response.data));
    } catch (e) {
        console.log(e)
    }
};
