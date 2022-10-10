import {
    ACCEPT_REVIEW_BEGIN,
    ACCEPT_REVIEW_FAILURE,
    ACCEPT_REVIEW_SUCCESS,
    ADD_PRODUCT_BEGIN,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCESS, ADD_REVIEW_BEGIN, ADD_REVIEW_FAILURE, ADD_REVIEW_SUCCESS,
    DELETE_PRODUCT_BEGIN,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_BEGIN, DELETE_REVIEW_FAILURE, DELETE_REVIEW_SUCCESS,
    FETCH_PRODUCT_BEGIN,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_BEGIN, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS,
} from "../action_types/product_action_types";

const initialState = {
    isProductsFetching: false,
    isProductFetching: false,
    isProductAdding: false,
    isReviewAdding: false,
    isProductDeleting: false,
    isReviewAccepting: false,
    isReviewDeleting: false,
    isProductUpdating: false,
    error: null,
    products: [],
    product: {},
    productReviews: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_BEGIN: {
            return {
                ...state,
                isProductAdding: true
            }
        }
        case ADD_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: [...state.products, action.product],
                isProductAdding: false
            }
        }
        case ADD_PRODUCT_FAILURE: {
            return {
                ...state,
                error: action.error,
                isProductAdding: false
            }
        }
        case FETCH_PRODUCTS_BEGIN: {
            return {
                ...state,
                isProductsFetching: true
            }
        }
        case FETCH_PRODUCTS_SUCCESS: {
            return {
                ...state,
                isProductsFetching: false,
                products: action.products
            }
        }
        case FETCH_PRODUCTS_FAILURE: {
            return {
                ...state,
                isProductsFetching: false,
                error: action.error
            }
        }
        case FETCH_PRODUCT_BEGIN: {
            return {
                ...state,
                isProductFetching: true
            }
        }
        case FETCH_PRODUCT_SUCCESS: {
            return {
                ...state,
                isProductFetching: false,
                product: action.product
            }
        }
        case FETCH_PRODUCT_FAILURE: {
            return {
                ...state,
                isProductFetching: false,
                product: action.product
            }
        }
        case ACCEPT_REVIEW_BEGIN: {
            return {
                ...state,
                isReviewAccepting: true
            }
        }
        case ACCEPT_REVIEW_SUCCESS: {
            return {
                ...state,
                isReviewAccepting: false
            }
        }
        case ACCEPT_REVIEW_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewAccepting: false
            }
        }
        case DELETE_PRODUCT_BEGIN: {
            return {
                ...state,
                isProductDeleting: true
            }
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: state.products.filter(i => i.id !== action.id),
                isProductDeleting: false
            }
        }
        case DELETE_PRODUCT_FAILURE: {
            return {
                ...state,
                error: action.error,
                isProductDeleting: false
            }
        }
        case UPDATE_PRODUCT_BEGIN: {
            return {
                ...state,
                isProductUpdating: true
            }
        }
        case UPDATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: [...state.products.slice(0, state.products.findIndex(i => i.id === action.product.id)),
                    action.product, ...state.products.slice(state.products.findIndex(i => i.id === action.product.id) + 1)],
                isProductUpdating: false
            }
        }
        case UPDATE_PRODUCT_FAILURE: {
            return {
                ...state,
                error: action.error,
                isProductUpdating: false
            }
        }
        case DELETE_REVIEW_BEGIN: {
            return {
                ...state,
                isReviewDeleting: true
            }
        }
        case DELETE_REVIEW_SUCCESS: {
            return {
                ...state,
                isReviewDeleting: false
            }
        }
        case DELETE_REVIEW_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewDeleting: false
            }
        }
        case ADD_REVIEW_BEGIN: {
            return {
                ...state,
                isReviewAdding: true
            }
        }
        case ADD_REVIEW_SUCCESS: {
            return {
                ...state,
                isReviewAdding: false
            }
        }
        case ADD_REVIEW_FAILURE: {
            return {
                ...state,
                error: action.error,
                isReviewAdding: false
            }
        }
        default: {
            return state
        }
    }
};

export default productReducer;