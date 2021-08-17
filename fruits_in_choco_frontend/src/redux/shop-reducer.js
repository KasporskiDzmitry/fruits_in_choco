import RequestService from "./RequestService";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

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
                currentProduct: action.currentProduct,
                currentProductReviews: action.currentProduct.reviews
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
const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});

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
}

export default shopReducer;