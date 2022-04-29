import RequestService from "../RequestService";
import {setProfile} from "../actions/profile_actions";

export const getProfile = () => async dispatch => {
    try {
        const response = await RequestService.get(`/profile`, true);
        dispatch(setProfile(response.data));
    } catch (e) {
        console.log(e);
    }
};
