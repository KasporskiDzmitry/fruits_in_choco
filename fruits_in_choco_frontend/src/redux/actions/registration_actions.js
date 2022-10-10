import {REGISTER_BEGIN, REGISTER_FAILURE, REGISTER_SUCCESS} from "../action_types/registration_action_types";

export const registerBegin = () => ({type: REGISTER_BEGIN});
export const registerSuccess = () => ({type: REGISTER_SUCCESS});
export const registerFailure = errors => ({type: REGISTER_FAILURE, payload: errors});