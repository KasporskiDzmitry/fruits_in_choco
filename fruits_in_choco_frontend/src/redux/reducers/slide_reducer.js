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

const initialState = {
    isSlidesFetching: false,
    isSlideAdding: false,
    isSlideUpdating: false,
    isSlideDeleting: false,
    error: null,
    slides: [],
};

const slide_reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SLIDES_BEGIN: {
            return {
                ...state,
                isSlidesFetching: true,
            };
        }
        case FETCH_SLIDES_SUCCESS: {
            return {
                ...state,
                slides: action.slides,
                isSlidesFetching: false,
            };
        }
        case FETCH_SLIDES_FAILURE: {
            return {
                ...state,
                error: action.error,
                isSlidesFetching: false,
            };
        }
        case ADD_SLIDE_BEGIN: {
            return {
                ...state,
                isSlideAdding: true,
            };
        }
        case ADD_SLIDE_SUCCESS: {
            return {
                ...state,
                slides: [...state.slides, action.slide],
                isSlideAdding: false,
            };
        }
        case ADD_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isSlideAdding: false,
            };
        }
        case UPDATE_SLIDE_BEGIN: {
            return {
                ...state,
                isSlideUpdating: true,
            };
        }
        case UPDATE_SLIDE_SUCCESS: {
            return {
                ...state,
                slides: [
                    ...state.slides.slice(
                        0,
                        state.slides.findIndex((i) => i.id === action.slide.id)
                    ),
                    action.slide,
                    ...state.slides.slice(
                        state.slides.findIndex((i) => i.id === action.slide.id) + 1
                    ),
                ],
                isSlideUpdating: false,
            };
        }
        case UPDATE_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isSlideUpdating: false,
            };
        }
        case DELETE_SLIDE_BEGIN: {
            return {
                ...state,
                isSlideDeleting: true,
            };
        }
        case DELETE_SLIDE_SUCCESS: {
            return {
                ...state,
                slides: state.slides.filter((i) => i.id !== action.id),
                isSlideDeleting: false,
            };
        }
        case DELETE_SLIDE_FAILURE: {
            return {
                ...state,
                error: action.error,
                isSlideDeleting: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default slide_reducer;
