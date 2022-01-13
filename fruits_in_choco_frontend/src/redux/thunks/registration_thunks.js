import RequestService from "../RequestService";
import {toggleIsFetching, registerFailure, registerSuccess} from "../actions/registration_actions";
import {togglePopUp, toggleSignInSignUpPopUp} from "../actions/app_actions";
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
    }
    dispatch(toggleIsFetching(false));
};