import RequestService from "./RequestService";

const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
    products: []
}

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        default: {
            return state
        }
    }
}

// actions
export const setProducts = products => ({type: SET_PRODUCTS, products});

//thunks
export const loadProducts = () => async dispatch => {
    try {
        const response = await RequestService.get('/product');
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const loadProductsByTypes = (types) => async dispatch => {
    try {
        const response = await RequestService.post('/product/search', {types});
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error)
    }
}

export default shopReducer;