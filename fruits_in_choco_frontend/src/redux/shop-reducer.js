import RequestService from "./RequestService";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

const initialState = {
    products: [],
    currentProduct: {}
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default: {
            return state
        }
    }
};

// actions
export const setProducts = products => ({type: SET_PRODUCTS, products});
const setCurrentProduct = currentProduct => ({type: SET_CURRENT_PRODUCT, currentProduct});

//thunks
export const loadProducts = () => async dispatch => {
    try {
        const response = await RequestService.get('/product');
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const loadProductById = id => async dispatch => {
    try {
        const response = await RequestService.get(`/product/${id}`);
        console.log(response.data)
        dispatch(setCurrentProduct(response.data));
    } catch (e) {
        console.log(e);
    }
};

export const loadProductsByTypes = (types) => async dispatch => {
    try {
        const response = await RequestService.post('/product/search', {types});
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error)
    }
}

export default shopReducer;