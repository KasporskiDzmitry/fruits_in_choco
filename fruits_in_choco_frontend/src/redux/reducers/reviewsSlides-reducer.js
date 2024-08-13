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

const initialState = {
    isReviewsSlidesFetching: false,
    isReviewSlideAdding: false,
    isReviewSlideUpdating: false,
    isReviewSlideDeleting: false,
    error: null,
    reviewsSlides: [],
};

const reviewsSlidesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEWS_SLIDES_BEGIN: {
            return {
                ...state,
                isReviewsSlidesFetching: true,
            };
        }
        case FETCH_REVIEWS_SLIDES_SUCCESS: {
            return {
                ...state,
                reviewsSlides: action.slides,
                isReviewsSlidesFetching: false,
            };
        }
        case FETCH_REVIEWS_SLIDES_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewsSlidesFetching: false,
            };
        }
        case ADD_REVIEW_SLIDE_BEGIN: {
            return {
                ...state,
                isReviewSlideAdding: true,
            };
        }
        case ADD_REVIEW_SLIDE_SUCCESS: {
            return {
                ...state,
                reviewsSlides: [...state.reviewsSlides, action.slide],
                isReviewSlideAdding: false,
            };
        }
        case ADD_REVIEW_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewSlideAdding: false,
            };
        }
        case UPDATE_REVIEW_SLIDE_BEGIN: {
            return {
                ...state,
                isReviewSlideUpdating: true,
            };
        }
        case UPDATE_REVIEW_SLIDE_SUCCESS: {
            return {
                ...state,
                reviewsSlides: [
                    ...state.reviewsSlides.slice(
                        0,
                        state.reviewsSlides.findIndex(
                            (i) => i.id === action.slide.id
                        )
                    ),
                    action.slide,
                    ...state.reviewsSlides.slice(
                        state.reviewsSlides.findIndex(
                            (i) => i.id === action.slide.id
                        ) + 1
                    ),
                ],
                isReviewSlideUpdating: false,
            };
        }
        case UPDATE_REVIEW_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewSlideUpdating: false,
            };
        }
        case DELETE_REVIEW_SLIDE_BEGIN: {
            return {
                ...state,
                isReviewSlideDeleting: true,
            };
        }
        case DELETE_REVIEW_SLIDE_SUCCESS: {
            return {
                ...state,
                reviewsSlides: state.reviewsSlides.filter(
                    (i) => i.id !== action.id
                ),
                isReviewSlideDeleting: false,
            };
        }
        case DELETE_REVIEW_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewSlideDeleting: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default reviewsSlidesReducer;
