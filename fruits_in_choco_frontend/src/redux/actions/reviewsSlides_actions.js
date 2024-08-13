import {
    ADD_REVIEW_SLIDE_BEGIN,
    ADD_REVIEW_SLIDE_FAILURE,
    ADD_REVIEW_SLIDE_SUCCESS,
    DELETE_REVIEW_SLIDE_BEGIN,
    DELETE_REVIEW_SLIDE_FAILURE,
    DELETE_REVIEW_SLIDE_SUCCESS,
    FETCH_REVIEWS_SLIDES_BEGIN,
    FETCH_REVIEWS_SLIDES_FAILURE,
    FETCH_REVIEWS_SLIDES_SUCCESS,
    UPDATE_REVIEW_SLIDE_BEGIN,
    UPDATE_REVIEW_SLIDE_FAILURE,
    UPDATE_REVIEW_SLIDE_SUCCESS,
} from '../action_types/reviewsSlides_action_types';

export const fetchReviewsSlidesBegin = () => ({
    type: FETCH_REVIEWS_SLIDES_BEGIN,
});
export const fetchReviewsSlidesSuccess = (slides) => ({
    type: FETCH_REVIEWS_SLIDES_SUCCESS,
    slides,
});
export const fetchReviewsSlidesFailure = (error) => ({
    type: FETCH_REVIEWS_SLIDES_FAILURE,
    error,
});
export const addReviewSlideBegin = () => ({ type: ADD_REVIEW_SLIDE_BEGIN });
export const addReviewSlideSuccess = (slide) => ({
    type: ADD_REVIEW_SLIDE_SUCCESS,
    slide,
});
export const addReviewSlideFailure = (error) => ({
    type: ADD_REVIEW_SLIDE_FAILURE,
    error,
});
export const updateReviewSlideBegin = () => ({
    type: UPDATE_REVIEW_SLIDE_BEGIN,
});
export const updateReviewSlideSuccess = (slide) => ({
    type: UPDATE_REVIEW_SLIDE_SUCCESS,
    slide,
});
export const updateReviewSlideFailure = (error) => ({
    type: UPDATE_REVIEW_SLIDE_FAILURE,
    error,
});
export const deleteReviewSlideBegin = () => ({
    type: DELETE_REVIEW_SLIDE_BEGIN,
});
export const deleteReviewSlideSuccess = (id) => ({
    type: DELETE_REVIEW_SLIDE_SUCCESS,
    id,
});
export const deleteReviewSlideFailure = (error) => ({
    type: DELETE_REVIEW_SLIDE_FAILURE,
    error,
});
