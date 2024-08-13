import {
    ADD_CATEGORY_BEGIN,
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_BEGIN,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_BEGIN,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_BEGIN,
    FETCH_CATEGORY_FAILURE,
    FETCH_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_BEGIN,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_SUCCESS,
} from '../action_types/category_action_types';

const initialState = {
    categories: [],
    category: {},
    error: null,
    isCategoriesFetching: false,
    isCategoryFetching: false,
    isCategoryAdding: false,
    isCategoryUpdating: false,
    isCategoryDeleting: false,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_BEGIN: {
            return {
                ...state,
                isCategoryFetching: true,
            };
        }
        case FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                categories: action.categories,
                isCategoryFetching: false,
            };
        }
        case FETCH_CATEGORIES_FAILURE: {
            return {
                ...state,
                error: action.error,
                isCategoryFetching: false,
            };
        }
        case FETCH_CATEGORY_BEGIN: {
            return {
                ...state,
                isCategoryFetching: true,
            };
        }
        case FETCH_CATEGORY_SUCCESS: {
            return {
                ...state,
                category: action.category,
                isCategoryFetching: false,
            };
        }
        case FETCH_CATEGORY_FAILURE: {
            return {
                ...state,
                error: action.error,
                isCategoryFetching: false,
            };
        }
        case ADD_CATEGORY_BEGIN: {
            return {
                ...state,
                isCategoryAdding: true,
            };
        }
        case ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: [...state.categories, action.category],
                isCategoryAdding: false,
            };
        }
        case ADD_CATEGORY_FAILURE: {
            return {
                ...state,
                error: action.error,
                isCategoryAdding: false,
            };
        }
        case UPDATE_CATEGORY_BEGIN: {
            return {
                ...state,
                isCategoryUpdating: true,
            };
        }
        case UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: [
                    ...state.categories.slice(
                        0,
                        state.categories.findIndex(
                            (i) => i.id === action.category.id
                        )
                    ),
                    action.category,
                    ...state.categories.slice(
                        state.categories.findIndex(
                            (i) => i.id === action.category.id
                        ) + 1
                    ),
                ],
                isCategoryUpdating: false,
            };
        }
        case UPDATE_CATEGORY_FAILURE: {
            return {
                ...state,
                error: action.error,
                isCategoryUpdating: false,
            };
        }
        case DELETE_CATEGORY_BEGIN: {
            return {
                ...state,
                isCategoryDeleting: true,
            };
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: state.categories.filter((i) => i.id !== action.id),
                isCategoryDeleting: false,
            };
        }
        case DELETE_CATEGORY_FAILURE: {
            return {
                ...state,
                error: action.error,
                isCategoryDeleting: false,
            };
        }
        default: {
            return state;
        }
    }
};

export default categoryReducer;
