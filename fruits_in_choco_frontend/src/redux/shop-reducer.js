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
        console.log(response.data);
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log(error);
    }

    // dispatch(setProducts([
    //     {
    //         categoryID: 0,
    //         categoryTitle: 'Fruits in chocolate',
    //         items: [
    //             {
    //                 id: 1,
    //                 title: 'title1',
    //                 description: 'description1',
    //                 price: 1
    //             },
    //             {
    //                 id: 2,
    //                 title: 'title2',
    //                 description: 'description2',
    //                 price: 2
    //             },
    //             {
    //                 id: 3,
    //                 title: 'title3',
    //                 description: 'description3',
    //                 price: 3
    //             }
    //         ]
    //     },
    //     {
    //         categoryID: 1,
    //         categoryTitle: 'Bakery',
    //         items: [
    //             {
    //                 id: 1,
    //                 title: 'title1',
    //                 description: 'description1',
    //                 price: 1
    //             },
    //             {
    //                 id: 2,
    //                 title: 'title2',
    //                 description: 'description2',
    //                 price: 2
    //             },
    //             {
    //                 id: 3,
    //                 title: 'title3',
    //                 description: 'description3',
    //                 price: 3
    //             }
    //         ]
    //     },
    //     {
    //         categoryID: 2,
    //         categoryTitle: 'Bouquets',
    //         items: [
    //             {
    //                 id: 1,
    //                 title: 'title1',
    //                 description: 'description1',
    //                 price: 1
    //             },
    //             {
    //                 id: 2,
    //                 title: 'title2',
    //                 description: 'description2',
    //                 price: 2
    //             },
    //             {
    //                 id: 3,
    //                 title: 'title3',
    //                 description: 'description3',
    //                 price: 3
    //             }
    //         ]
    //     }
    // ]))
}

export default shopReducer;