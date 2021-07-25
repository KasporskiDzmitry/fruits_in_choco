const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
    pathnames: [
        {path: '/shop', name: 'Магазин'},
        {path: '/fruits_in_chocolate', name: 'Фрукты в шоколаде'},
        {path: '/bakery', name: 'Выпечка'},
        {path: '/bouquets', name: 'Букеты'},
        {path: '/fitness_bakery', name: 'ПП выпечка'},
    ],
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
export const loadProducts = () => dispatch => {

    dispatch(setProducts([
        {
            categoryID: 0,
            categoryTitle: 'Fruits in chocolate',
            items: [
                {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    price: 1
                },
                {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    price: 2
                },
                {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    price: 3
                }
            ]
        },
        {
            categoryID: 1,
            categoryTitle: 'Bakery',
            items: [
                {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    price: 1
                },
                {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    price: 2
                },
                {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    price: 3
                }
            ]
        },
        {
            categoryID: 2,
            categoryTitle: 'Bouquets',
            items: [
                {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    price: 1
                },
                {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    price: 2
                },
                {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    price: 3
                }
            ]
        }
    ]))
}

export default shopReducer;