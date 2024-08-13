import { initializedSuccess } from '../actions/app_actions';
import {
    fetchRefreshTokenBegin,
    fetchRefreshTokenFailure,
    fetchRefreshTokenSuccess,
} from '../actions/auth_actions';
import RequestService from '../RequestService';
import { loadCategories } from './category_thunks';
import { loadSlides } from './slide_thunks';
import { loadReviewSlides } from './reviewsSlides_thunks';

export const init = () => async (dispatch) => {
    if (localStorage.name) {
        try {
            dispatch(fetchRefreshTokenBegin());
            const response = await RequestService.post('/auth/refreshToken');
            dispatch(fetchRefreshTokenSuccess(response.data));
        } catch (e) {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            localStorage.removeItem('isAuth');
            console.log(e);
            dispatch(fetchRefreshTokenFailure(e));
        }
    }

    if (localStorage.role === 'ADMIN') {
        // TODO: admin init
    }

    await Promise.all([
        dispatch(
            loadCategories(),
            dispatch(loadSlides()),
            dispatch(loadReviewSlides())
        ),
    ]);
    dispatch(initializedSuccess());
};
