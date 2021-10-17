import {initializedSuccess} from "../actions/app_actions";
import {loadCategories} from "./main_thunks";
import {refreshTokenSuccess} from "../actions/auth_actions";
import {logout} from "./auth_thunks";
import RequestService from "../RequestService";

export const init = () => async dispatch => {
    if (localStorage.name) {
        try {
            const response = await RequestService.post("/auth/refreshToken");
            dispatch(refreshTokenSuccess(response.data));
        } catch (e) {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLoggedIn');
        }
    }
    await Promise.all([dispatch(loadCategories())]);
    dispatch(initializedSuccess());
};
