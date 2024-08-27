import { initializedSuccess } from '../actions/app_actions';
import { loadCategories } from './category_thunks';
import { loadSlides } from './slide_thunks';
import { loadReviewSlides } from './reviewsSlides_thunks';

export const init = () => async (dispatch) => {
    if (localStorage.role === 'ADMIN') {
        // TODO: admin init
    }

    await Promise.all([
        dispatch(loadCategories()),
        dispatch(loadSlides()),
        dispatch(loadReviewSlides()),
    ]);
    dispatch(initializedSuccess());
};
