import RequestService from "../RequestService";
import {setFilteredCategories} from "../actions/shop_actions";
import {setCategories} from "../actions/category_actions";

export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/categories');
        dispatch(setCategories(response.data));
        dispatch(setFilteredCategories(response.data.map(i => i.id)));
    } catch (e) {
        console.log(e)
    }
};
