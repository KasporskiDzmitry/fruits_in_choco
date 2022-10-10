import {
    FETCH_USER_BEGIN,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS, FETCH_USERS_BEGIN, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS,
} from "../action_types/user_action_types";

export const fetchUserBegin = () => ({type: FETCH_USER_BEGIN});
export const fetchUserSuccess = (user) => ({type: FETCH_USER_SUCCESS, user});
export const fetchUserFailure = (error) => ({type: FETCH_USER_FAILURE, error});
export const fetchUsersBegin = () => ({type: FETCH_USERS_BEGIN});
export const fetchUsersSuccess = (users) => ({type: FETCH_USERS_SUCCESS, users});
export const fetchUsersFailure = (error) => ({type: FETCH_USERS_FAILURE, error});
