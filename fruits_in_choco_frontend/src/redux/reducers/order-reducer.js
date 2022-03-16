import {ORDER_MADE_SUCCESS, SET_ORDER_INFO, SET_ORDERS, TOGGLE_IS_FETCHING} from "../action_types/order_action_types";

const initialState = {
    order: {},
    orders: [],
    orderInfo: {},
    isFetching: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case ORDER_MADE_SUCCESS: {
            return {
                ...state,
                order: action.order
            }
        }
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }
        case SET_ORDER_INFO: {
            return {
                ...state,
                orderInfo: action.order
            }
        }
        default: {
            return state
        }
    }
};

export default orderReducer;