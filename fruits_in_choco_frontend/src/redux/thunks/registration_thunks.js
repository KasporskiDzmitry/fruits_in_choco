import RequestService from "../RequestService";
import {registerSuccess, toggleIsFetching} from "../actions/registration_actions";
import {toggleSignInSignUpPopUp} from "../actions/app_actions";
import {reset, stopSubmit} from "redux-form";

export const registration = user => async dispatch => {
    dispatch(toggleIsFetching(true));
    try {
        await RequestService.post("/registration", user);
        dispatch(registerSuccess());
        dispatch(reset('registration'));
        dispatch(toggleSignInSignUpPopUp());
        // window.location.href = '/login'; // убрать отсюда
    } catch (error) {
        dispatch(stopSubmit('registration', {_error: error.response.data}));
    } finally {
        dispatch(toggleIsFetching(false));
    }
};