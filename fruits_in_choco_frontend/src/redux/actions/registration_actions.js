import {REGISTER_FAILURE, REGISTER_SUCCESS, TOGGLE_IS_FETCHING} from "../action_types/registration_action_types";

export const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const registerSuccess = () => ({type: REGISTER_SUCCESS});
export const registerFailure = errors => ({type: REGISTER_FAILURE, payload: errors});