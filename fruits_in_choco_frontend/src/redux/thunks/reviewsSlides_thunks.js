import RequestService from '../../util/RequestService';
import { reset } from 'redux-form';
import { enqueueSnackbar } from '../actions/app_actions';
import {
    addReviewSlideBegin,
    addReviewSlideFailure,
    addReviewSlideSuccess,
    deleteReviewSlideBegin,
    deleteReviewSlideFailure,
    deleteReviewSlideSuccess,
    fetchReviewsSlidesBegin,
    fetchReviewsSlidesFailure,
    fetchReviewsSlidesSuccess,
    updateReviewSlideBegin,
    updateReviewSlideFailure,
    updateReviewSlideSuccess,
} from '../actions/reviewsSlides_actions';

export const loadReviewSlides = () => async (dispatch) => {
    try {
        dispatch(fetchReviewsSlidesBegin());
        const response = await RequestService.get('/review_slide');
        dispatch(fetchReviewsSlidesSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchReviewsSlidesFailure(e));
    }
};

export const saveReviewSlide = (slide) => async (dispatch) => {
    try {
        dispatch(addReviewSlideBegin());
        const response = await RequestService.post(
            '/review_slide',
            slide,
            true
        );
        dispatch(addReviewSlideSuccess(response.data));
        dispatch(reset('add_review_slide'));
        dispatch(enqueueSnackbar('Review slide saved successfully', 'success'));
    } catch (e) {
        dispatch(enqueueSnackbar('Error while saving review slide', 'error'));
        console.log(e);
        dispatch(addReviewSlideFailure(e));
    }
};

export const updateReviewSlide = (slide) => async (dispatch) => {
    try {
        dispatch(updateReviewSlideBegin());
        const response = await RequestService.put(
            `/review_slide/${slide.id}`,
            slide,
            true
        );
        dispatch(updateReviewSlideSuccess(response.data));
        dispatch(
            enqueueSnackbar('Review slide updated successfully', 'success')
        );
    } catch (e) {
        dispatch(enqueueSnackbar('Error while updating review slide', 'error'));
        console.log(e);
        dispatch(updateReviewSlideFailure(e));
    }
};

export const deleteReviewSlide = (slide) => async (dispatch) => {
    try {
        dispatch(deleteReviewSlideBegin());
        await RequestService.delete(`/review_slide/${slide.id}`, true);
        dispatch(deleteReviewSlideSuccess(slide.id));
        dispatch(
            enqueueSnackbar('Review slide removed successfully', 'success')
        );
    } catch (e) {
        dispatch(enqueueSnackbar('Error while removing review slide', 'error'));
        console.log(e);
        dispatch(deleteReviewSlideFailure(e));
    }
};
