import {setData, toggleIsFetching} from "../actions/cakeConstructor_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {enqueueSnackbar} from "../actions/app_actions";

export const loadData = () => async dispatch => {
    try {
        const response = await RequestService.get('/constructor');
        dispatch(setData(response.data));
    } catch (e) {
        console.log(e);
    }
}

export const saveCake = (cake) => async dispatch => {
    try {
        const response = await RequestService.post('/cakes', cake);
        dispatch(reset("cakeConstructor"))
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

export const updateConstructorData = (type, item) => async dispatch => {
    try {
        const response = await RequestService.put(`/${type}/${item.id}`, item, true);
        dispatch(loadData());
        dispatch(enqueueSnackbar(`Updated successfully`, "success"));
    } catch (e) {
        dispatch(enqueueSnackbar(`Error while updating`, "error"));
        console.log(e);
    }
}

export const createConstructorData = (objectType, item) => async dispatch => {
    try {
        const response = await RequestService.post(`/${objectType}`, item, true);
        dispatch(loadData());
        dispatch(enqueueSnackbar(`Created successfully`, "success"));
    } catch (e) {
        dispatch(enqueueSnackbar(`Error while creating`, "error"));
        console.log(e);
    }
}
