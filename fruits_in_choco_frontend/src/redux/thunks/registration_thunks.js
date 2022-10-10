import RequestService from "../RequestService";
import {registerBegin, registerFailure, registerSuccess} from "../actions/registration_actions";
import {toggleSignInSignUpPopUp} from "../actions/app_actions";
import {reset, stopSubmit} from "redux-form";

export const registration = user => async dispatch => {
    try {
        dispatch(registerBegin());
        await RequestService.post("/registration", user);
        dispatch(registerSuccess());
        dispatch(reset('registration'));
        dispatch(toggleSignInSignUpPopUp());
        // window.location.href = '/login'; // убрать отсюда
    } catch (error) {
        console.log(error)
        dispatch(stopSubmit('registration', {_error: error.response.data}));
        dispatch(registerFailure(error));
    }
};