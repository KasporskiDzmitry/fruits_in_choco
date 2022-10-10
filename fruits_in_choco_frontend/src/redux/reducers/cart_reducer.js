import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_PRODUCT_IN_CART} from "../action_types/cart_action_types";

const initialState = {
    isCartFetching: false,
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
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.id)
            }
        }
        default: {
            return state
        }
    }
};

export default cartReducer;