import RequestService from "../RequestService";
import {fetchUsersBegin, fetchUsersFailure, fetchUsersSuccess} from "../actions/user_actions";

export const loadUsers = () => async dispatch => {
    try {
        dispatch(fetchUsersBegin());
        const response = await RequestService.get('/admin/users', true);
        dispatch(fetchUsersSuccess(response.data));
    } catch (e) {
        console.log(e)
        dispatch(fetchUsersFailure(e));
    }
}

export const loadUserById = id => async dispatch =>{
    try {
        dispatch(fetchUsersBegin());
        const response = await RequestService.get(`/admin/users/${id}`, true);
        dispatch(fetchUsersSuccess(response.data));
    } catch (e) {
        console.log(e)
        dispatch(fetchUsersFailure(e));
    }
}