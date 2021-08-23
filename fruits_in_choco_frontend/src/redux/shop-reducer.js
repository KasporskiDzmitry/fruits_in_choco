import RequestService from "./RequestService";
import {getProfile} from "./profile-reducer";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
const SET_CURRENT_PRODUCT_REVIEWS = 'SET_CURRENT_PRODUCT_REVIEWS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const UPDATE_REVIEW = 'UPDATE_REVIEW';

const initialState = {
    products: [],
    currentProduct: {},
    currentProductReviews: [],

    isFetching: false
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        case SET_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: action.currentProduct
            }
        }
        case SET_CURRENT_PRODUCT_REVIEWS: {
            return {
                ...state,
                currentProductReviews: action.reviews
            }
        }
        case UPDATE_REVIEW: {
            return {
                ...state,
                currentProductReviews: state.currentProductReviews.map(i => {
                    if (i.id === action.review.id) {
                        console.log(action.review.stars)
                        return {...i, text: action.review.text, datetime: action.review.datetime, stars: action.review.stars}
                    }
                    return i;
                })
            }
        }
        default: {
            return state
        }
    }
};

// actions
export const setProducts = products => ({type: SET_PRODUCTS, products});
const setCurrentProduct = currentProduct => ({type: SET_CURRENT_PRODUCT, currentProduct});
const setCurrentProductReviews = reviews => ({type: SET_CURRENT_PRODUCT_REVIEWS, reviews});
const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
const updateReviewSuccess = review => ({type: UPDATE_REVIEW, review});

//thunks
export const loadProducts = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/product');
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
};

export const loadProductById = id => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get(`/product/${id}`);
    dispatch(toggleIsFetching(false));
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.reviews));
};

export const loadProductsByTypes = (types) => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.post('/product/search', {types});
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
};

export const addReview = (review) => async dispatch => {
    const response = await RequestService.post('/product/review', review, true);
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.reviews));

    dispatch(getProfile());
}

export const updateReview = review => async dispatch => {
    const response = await RequestService.put(`/product/review`, review, true);

    dispatch(updateReviewSuccess(review));
}

export default shopReducer;