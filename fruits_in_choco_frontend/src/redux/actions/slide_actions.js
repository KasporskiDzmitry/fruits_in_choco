import {
    ADD_SLIDE_BEGIN,
    ADD_SLIDE_FAILURE,
    ADD_SLIDE_SUCCESS,
    DELETE_SLIDE_BEGIN,
    DELETE_SLIDE_FAILURE,
    DELETE_SLIDE_SUCCESS,
    FETCH_SLIDES_BEGIN,
    FETCH_SLIDES_FAILURE,
    FETCH_SLIDES_SUCCESS,
    UPDATE_SLIDE_BEGIN,
    UPDATE_SLIDE_FAILURE,
    UPDATE_SLIDE_SUCCESS,
} from '../action_types/slide_action_types';

export const fetchSlidesBegin = () => ({ type: FETCH_SLIDES_BEGIN });
export const fetchSlidesSuccess = (slides) => ({
    type: FETCH_SLIDES_SUCCESS,
    slides,
});
export const fetchSlidesFailure = (error) => ({
    type: FETCH_SLIDES_FAILURE,
    error,
});
export const addSlideBegin = () => ({ type: ADD_SLIDE_BEGIN });
export const addSlideSuccess = (slide) => ({ type: ADD_SLIDE_SUCCESS, slide });
export const addSlideFailure = (error) => ({ type: ADD_SLIDE_FAILURE, error });
export const updateSlideBegin = () => ({ type: UPDATE_SLIDE_BEGIN });
export const updateSlideSuccess = (slide) => ({
    type: UPDATE_SLIDE_SUCCESS,
    slide,
});
export const updateSlideFailure = (error) => ({
    type: UPDATE_SLIDE_FAILURE,
    error,
});
export const deleteSlideBegin = () => ({ type: DELETE_SLIDE_BEGIN });
export const deleteSlideSuccess = (id) => ({ type: DELETE_SLIDE_SUCCESS, id });
export const deleteSlideFailure = (error) => ({
    type: DELETE_SLIDE_FAILURE,
    error,
});
