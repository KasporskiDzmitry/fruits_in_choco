import {
    SET_CURRENT_PRODUCT,
    SET_CURRENT_PRODUCT_REVIEWS, SET_FILTERED_TYPES,
    SET_PRODUCTS,
    TOGGLE_IS_FETCHING,
    ADD_TO_CART,
    REMOVE_FROM_CART, TOGGLE_IS_CART_SHOW
} from "../action_types/shop_action_types";

const initialState = {
    products: [],
    currentProduct: {},
    currentProductReviews: [],
    filteredTypes: [],
    cart: [],
    isCartShow: false,
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
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.product]
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(i => i.id !== action.id)
            }
        }
        case TOGGLE_IS_CART_SHOW: {
            return {
                ...state,
                isCartShow: !state.isCartShow
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
                currentProduct: action.currentProduct
            }
        }
        case SET_CURRENT_PRODUCT_REVIEWS: {
            return {
                ...state,
                currentProductReviews: action.reviews
            }
        }
        case SET_FILTERED_TYPES: {
            return {
                ...state,
                filteredTypes: action.types
            }
        }
        default: {
            return state
        }
    }
};

export default shopReducer;