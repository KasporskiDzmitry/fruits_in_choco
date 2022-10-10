import {
    ADD_PRODUCT_TO_CART_BEGIN, ADD_PRODUCT_TO_CART_FAILURE, ADD_PRODUCT_TO_CART_LOCALLY,
    ADD_PRODUCT_TO_CART_SUCCESS,
    CLEAR_CART, DELETE_FROM_CART_BEGIN, DELETE_FROM_CART_FAILURE, DELETE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_LOCALLY,
    UPDATE_PRODUCT_IN_CART
} from "../action_types/cart_action_types";

const initialState = {
    isCartFetching: false,
    isProductSavingToCart: false,
    isProductDeletingFromCart: false,
    error: null,
    cart: localStorage.products ? JSON.parse(localStorage.products) : []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CART: {
            return {
                ...state,
                cart: []
            }
        }
        case ADD_PRODUCT_TO_CART_LOCALLY: {
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        }
        case ADD_PRODUCT_TO_CART_BEGIN: {
            return {
                ...state,
                isProductSavingToCart: true
            }
        }
        case ADD_PRODUCT_TO_CART_SUCCESS: {
            return {
                ...state,
                isProductSavingToCart: false
            }
        }
        case ADD_PRODUCT_TO_CART_FAILURE: {
            return {
                ...state,
                error: action.error.error,
                isProductSavingToCart: false
            }
        }
        case UPDATE_PRODUCT_IN_CART: {
            return {
                ...state,
                cart: [...state.cart.slice(0, state.cart.findIndex(i => i.id === action.product.id)),
                    action.product, ...state.cart.slice(state.cart.findIndex(i => i.id === action.product.id) + 1)]
            }
        }
        case REMOVE_FROM_CART_LOCALLY: {
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.id)
            }
        }
        case DELETE_FROM_CART_BEGIN: {
            return {
                ...state,
                isProductDeletingFromCart: true
            }
        }
        case DELETE_FROM_CART_SUCCESS: {
            return {
                ...state,
                isProductDeletingFromCart: false
            }
        }
        case DELETE_FROM_CART_FAILURE: {
            return {
                ...state,
                error: action.error,
                isProductDeletingFromCart: false
            }
        }
        default: {
            return state
        }
    }
};

export default cartReducer;