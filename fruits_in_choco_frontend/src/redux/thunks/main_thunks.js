import RequestService from "../RequestService";
import {setCategories, setCategory, setSlides} from "../actions/main_actions";
import {setFilteredTypes} from "../actions/shop_actions";

export const loadSlides = () => async dispatch => {
    try {
        const response = await RequestService.get('/slide');
        dispatch(setSlides(response.data))
    } catch (e) {
        console.log(e)
    }
};
