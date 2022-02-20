import {setData, toggleIsFetching} from "../actions/cakeConstructor_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {enqueueSnackbar} from "../actions/app_actions";

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

export const saveCake = (cake) => async dispatch => {
    try {
        // dispatch(toggleIsFetching()); ??
        const response = await RequestService.post('/cakes', cake);
        dispatch(reset("cakeConstructor"))
        // dispatch(toggleIsFetching()); ??
    } catch (e) {
        console.log(e);
    }
}

export const deleteConstructorData = (name, id) => async dispatch => {
    try {
        const response = await RequestService.delete(`/${name}/${id}`, true);
        dispatch(loadData());
        dispatch(enqueueSnackbar(`${name} removed successfully`, "success"));
    } catch (e) {
        dispatch(enqueueSnackbar(`Error while removing ${name}`, "error"));
        console.log(e)
    }
}
