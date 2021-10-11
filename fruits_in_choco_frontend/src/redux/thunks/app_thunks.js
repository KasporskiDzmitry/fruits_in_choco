import {initializedSuccess} from "../actions/app_actions";
import {loadCategories} from "./main_thunks";

export const init = () => async dispatch => {
    await Promise.all([dispatch(loadCategories())])
    dispatch(initializedSuccess());
};