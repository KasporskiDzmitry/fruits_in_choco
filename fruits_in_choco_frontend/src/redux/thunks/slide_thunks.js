import RequestService from '../RequestService';
import { reset } from 'redux-form';
import { enqueueSnackbar } from '../actions/app_actions';
import {
    addSlideBegin,
    addSlideFailure,
    addSlideSuccess,
    deleteSlideBegin,
    deleteSlideFailure,
    deleteSlideSuccess,
    fetchSlidesBegin,
    fetchSlidesFailure,
    fetchSlidesSuccess,
    updateSlideBegin,
    updateSlideFailure,
    updateSlideSuccess,
} from '../actions/slide_actions';

export const loadSlides = () => async (dispatch) => {
    try {
        dispatch(fetchSlidesBegin());
        const response = await RequestService.get('/slide');
        dispatch(fetchSlidesSuccess(response.data));
    } catch (e) {
        console.log(e);
        dispatch(fetchSlidesFailure(e));
    }
};

export const saveSlide = (slide) => async (dispatch) => {
    try {
        dispatch(addSlideBegin());
        const response = await RequestService.post('/slide', slide, true);
        dispatch(addSlideSuccess(response.data));
        // dispatch(loadSlides());
        dispatch(reset('add_slide'));
        dispatch(enqueueSnackbar('Slide saved successfully', 'success'));
    } catch (e) {
        dispatch(enqueueSnackbar('Error while saving slide', 'error'));
        console.log(e);
        dispatch(addSlideFailure(e));
    }
};

export const updateSlide = (slide) => async (dispatch) => {
    try {
        dispatch(updateSlideBegin());
        const response = await RequestService.put(
            `/slide/${slide.id}`,
            slide,
            true
        );
        dispatch(updateSlideSuccess(response.data));
        dispatch(enqueueSnackbar('Slide updated successfully', 'success'));
        // dispatch(loadSlides());
    } catch (e) {
        dispatch(enqueueSnackbar('Error while updating slide', 'success'));
        console.log(e);
        dispatch(updateSlideFailure(e));
    }
};

export const deleteSlide = (slide) => async (dispatch) => {
    try {
        dispatch(deleteSlideBegin());
        const response = await RequestService.delete(
            `/slide/${slide.id}`,
            true
        );
        dispatch(enqueueSnackbar('Slide removed successfully', 'success'));
        dispatch(deleteSlideSuccess(slide.id));
        // dispatch(loadSlides());
    } catch (e) {
        dispatch(enqueueSnackbar('Error while removing slide', 'error'));
        console.log(e);
        dispatch(deleteSlideFailure(e));
    }
};
