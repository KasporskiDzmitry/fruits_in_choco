import {FETCH_PROFILE_BEGIN, FETCH_PROFILE_FAILURE, FETCH_PROFILE_SUCCESS} from "../action_types/profile_action_types";

export const fetchProfileBegin = () => ({type: FETCH_PROFILE_BEGIN});
export const fetchProfileSuccess = (profile) => ({type: FETCH_PROFILE_SUCCESS, profile});
export const fetchProfileFailure = (error) => ({type: FETCH_PROFILE_FAILURE, error});
