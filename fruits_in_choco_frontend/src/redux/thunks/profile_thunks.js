import RequestService from "../RequestService";
import {fetchProfileBegin, fetchProfileFailure, fetchProfileSuccess} from "../actions/profile_actions";

export const getProfile = () => async dispatch => {
    try {
        dispatch(fetchProfileBegin());
        const response = await RequestService.get(`/profile`, true);
        dispatch(fetchProfileSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchProfileFailure(e));
    }
};
