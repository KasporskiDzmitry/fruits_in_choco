import {setData, toggleIsFetching} from "../actions/cakeConstructor_actions";
import RequestService from "../RequestService";
import {reset, stopSubmit} from "redux-form";
import {enqueueSnackbar} from "../actions/app_actions";
import {saveProductToCart} from "./shop_thunks";

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
        console.log(cake)
        const response = await RequestService.post('/cakes', cake);
        dispatch(saveProductToCart(cake));
        dispatch(reset("cakeConstructor"))
    } catch (e) {
        console.log(e);
    }
}

export const deleteConstructorData = (id) => async dispatch => {
    try {
        const response = await RequestService.delete(`/ingredient/${id}`, true);
        dispatch(loadData());
        dispatch(enqueueSnackbar(`Ingredient removed successfully`, "success"));
    } catch (e) {
        dispatch(enqueueSnackbar(`Error while removing ingredient`, "error"));
        console.log(e)
    }
}

export const updateConstructorData = (item) => async dispatch => {
    try {
        const response = await RequestService.put(`/ingredient/${item.id}`, item, true);
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
