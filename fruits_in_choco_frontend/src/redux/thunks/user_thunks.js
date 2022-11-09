import RequestService from "../RequestService";
import {
    fetchUserBegin, fetchUserFailure,
    fetchUsersBegin,
    fetchUsersFailure,
    fetchUsersSuccess,
    fetchUserSuccess
} from "../actions/user_actions";

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
        dispatch(fetchUserBegin());
        const response = await RequestService.get(`/admin/users/${id}`, true);
        dispatch(fetchUserSuccess(response.data));
    } catch (e) {
        console.log(e)
        dispatch(fetchUserFailure(e));
    }
}