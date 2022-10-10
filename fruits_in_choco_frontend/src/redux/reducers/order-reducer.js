import {
    FETCH_ORDER_BEGIN,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDERS_BEGIN,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDERS_SUCCESS,
    MAKE_ORDER_BEGIN,
    MAKE_ORDER_FAILURE,
    MAKE_ORDER_SUCCESS,
    UPDATE_ORDER_BEGIN, UPDATE_ORDER_FAILURE,
    UPDATE_ORDER_SUCCESS
} from "../action_types/order_action_types";

const initialState = {
    isOrderFetching: false,
    isOrdersFetching: false,
    isOrderMaking: false,
    isOrderUpdating: false,
    error: null,
    order: {},
    orders: [],
    isFetching: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_ORDER_BEGIN: {
            return {
                ...state,
                isOrderMaking: true
            }
        }
        case MAKE_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                isOrderMaking: false
            }
        }
        case MAKE_ORDER_FAILURE: {
            return {
                ...state,
                error: action.error,
                isOrderMaking: false
            }
        }
        case FETCH_ORDER_BEGIN: {
            return {
                ...state,
                isOrderFetching: true
            }
        }
        case FETCH_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                isOrderFetching: false
            }
        }
        case FETCH_ORDER_FAILURE: {
            return {
                ...state,
                error: action.error,
                isOrderFetching: false
            }
        }
        case FETCH_ORDERS_BEGIN: {
            return {
                ...state,
                isOrdersFetching: true
            }
        }
        case FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                orders: action.orders,
                isOrdersFetching: false
            }
        }
        case FETCH_ORDERS_FAILURE: {
            return {
                ...state,
                error: action.error,
                isOrdersFetching: false
            }
        }
        case UPDATE_ORDER_BEGIN: {
            return {
                ...state,
                isOrderUpdating: true
            }
        }
        case UPDATE_ORDER_SUCCESS: {
            return {
                ...state,
                orders: [...state.orders.slice(0, state.orders.findIndex(i => i.id === action.order.id)),
                    action.order, ...state.orders.slice(state.orders.findIndex(i => i.id === action.order.id) + 1)],
                isOrderUpdating: false
            }
        }
        case UPDATE_ORDER_FAILURE: {
            return {
                ...state,
                error: action.error,
                isOrderUpdating: false
            }
        }
        default: {
            return state
        }
    }
};

export default orderReducer;