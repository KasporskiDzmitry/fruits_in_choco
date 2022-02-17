import {setData, toggleIsFetching} from "../actions/cakeConstructor_actions";
import RequestService from "../RequestService";

export const loadData = () => async dispatch => {
    try {
        dispatch(toggleIsFetching());
        const response = await RequestService.get('/constructor');
        dispatch(setData(response.data));
        dispatch(toggleIsFetching());
    } catch (e) {
        console.log(e);
    }
}
