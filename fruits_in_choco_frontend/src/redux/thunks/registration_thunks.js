import RequestService from "../RequestService";
import {toggleIsFetching, registerFailure, registerSuccess} from "../actions/registration_actions";
import {togglePopUp} from "../actions/app_actions";

export const registration = user => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));
        await RequestService.post("/registration", user);
        dispatch(toggleIsFetching(false));
        dispatch(registerSuccess());
        // window.location.href = '/login'; // убрать отсюда
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    }
};