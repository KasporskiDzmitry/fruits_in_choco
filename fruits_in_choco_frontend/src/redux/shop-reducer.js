import RequestService from "./RequestService";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FILTERED_TYPES = 'SET_FILTERED_TYPES';

const initialState = {
    pathnames: [
        {path: '/shop', name: 'Магазин'},
        {path: '/fruits_in_chocolate', name: 'Фрукты в шоколаде'},
        {path: '/bakery', name: 'Выпечка'},
        {path: '/bouquets', name: 'Букеты'},
        {path: '/fitness_bakery', name: 'ПП выпечка'},
    ],
    products: [],
    filteredTypes: []
}

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        case SET_FILTERED_TYPES: {
            return {
                ...state,
                filteredTypes: action.filteredTypes
            }
        }
        default: {
            return state
        }
    }
}

// actions
export const setProducts = products => ({type: SET_PRODUCTS, products});
export const setFilteredTypes = filteredTypes => ({type: SET_FILTERED_TYPES, filteredTypes});

//thunks
export const loadProducts = () => async dispatch => {

    try {
        const response = await RequestService.get('/product');
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error);
    }
}

export default shopReducer;