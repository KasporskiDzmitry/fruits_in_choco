import RequestService from '../../api/RequestService';
import {
    loginBegin,
    loginFailure,
    loginSuccess,
    logoutBegin,
    logoutFailure,
    logoutSuccess,
} from '../actions/auth_actions';
import { reset, stopSubmit } from 'redux-form';
import { removeUserInfoFromLS, saveUserInfoToLS } from '../../util/localStorageFunctions';

export const login = (email, password, navigate) => async (dispatch) => {
    dispatch(loginBegin());
    try {
        const response = await RequestService.post('/auth/login', {
            email,
            password,
        });

        saveUserInfoToLS(response.data);
        dispatch(
            loginSuccess(
                response.data.id,
                response.data.email,
                response.data.name,
                response.data.role,
                response.data.token,
                true
            )
        );
        dispatch(reset('login'));
        navigate('/admin');
    } catch (error) {
        console.log(error);
        dispatch(stopSubmit('login', { _error: error.response.data }));
        dispatch(loginFailure(error));
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutBegin());
        const response = await RequestService.post('/auth/logout', null, true);
        removeUserInfoFromLS();
        dispatch(logoutSuccess());
    } catch (e) {
        console.log(e);
        dispatch(logoutFailure(e));
    } finally {
        // IS IT SAFE???
        window.location.reload(false);
    }
};
