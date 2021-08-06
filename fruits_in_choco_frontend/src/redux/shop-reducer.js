import RequestService from "./RequestService";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FILTERED_TYPES = 'SET_FILTERED_TYPES';
const SET_SORT_BY = 'SET_SORT_BY';
const SET_IS_ASC_SORT = 'SET_IS_ASC_SORT';

const initialState = {
    products: [],
    filteredTypes: null,
    sortBy: 'price',
    isAscSort: true
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
        case SET_SORT_BY: {
            return {
                ...state,
                sortBy: action.sortBy
            }
        }
        case SET_IS_ASC_SORT: {
            return {
                ...state,
                isAscSort: action.isAscSort
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
export const setSortBy = sortBy => ({type: SET_SORT_BY, sortBy});
export const setIsAscSort = isAscSort => ({type: SET_IS_ASC_SORT, isAscSort});

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