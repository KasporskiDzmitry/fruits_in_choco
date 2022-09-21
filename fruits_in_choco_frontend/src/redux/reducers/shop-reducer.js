import {
    ADD_TO_CART,
    CLEAR_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_PRODUCT,
    SET_CURRENT_PRODUCT_REVIEWS,
    SET_FILTERED_CATEGORIES,
    SET_IS_PRODUCT_FETCHING,
    SET_IS_PRODUCTS_FETCHING,
    SET_PRODUCTS,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_IN_CART
} from "../action_types/shop_action_types";

const initialState = {
    products: [],
    currentProduct: {},
    currentProductReviews: [],
    filteredCategories: [],
    cart: localStorage.products ? JSON.parse(localStorage.products) : [],
    isFetching: false,
    isProductsFetching: false,
    isProductFetching: false,
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CART: {
            return {
                ...state,
                cart: []
            }
        }
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        }
        case UPDATE_PRODUCT_IN_CART: {
            return {
                ...state,
                cart: [...state.cart.slice(0, state.cart.findIndex(i => i.id === action.product.id)),
                    action.product, ...state.cart.slice(state.cart.findIndex(i => i.id === action.product.id) + 1)]
            }
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                products: [...state.products.slice(0, state.products.findIndex(i => i.id === action.product.id)),
                action.product, ...state.products.slice(state.products.findIndex(i => i.id === action.product.id) + 1)]
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.id)
            }
        }
        case SET_IS_PRODUCTS_FETCHING: {
            return {
                ...state,
                isProductsFetching: action.isFetching
            }
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        case SET_IS_PRODUCT_FETCHING: {
            return {
                ...state,
                isProductFetching: action.isFetching
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
        case SET_FILTERED_CATEGORIES: {
            return {
                ...state,
                filteredCategories: action.categories
            }
        }
        default: {
            return state
        }
    }
};

export default shopReducer;