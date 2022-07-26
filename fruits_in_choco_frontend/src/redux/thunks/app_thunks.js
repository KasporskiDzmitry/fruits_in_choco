import {initializedSuccess} from "../actions/app_actions";
import {refreshTokenSuccess} from "../actions/auth_actions";
import RequestService from "../RequestService";
import {loadCategories} from "./category_thunks";
import {loadAllOrders, loadProductsAdmin} from "./admin_thunks";

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

    if (localStorage.role === 'ADMIN') {
        dispatch(loadProductsAdmin());
        dispatch(loadAllOrders());
    }

    await Promise.all([dispatch(loadCategories())]);
    dispatch(initializedSuccess());
};

