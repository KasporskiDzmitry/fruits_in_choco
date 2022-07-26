import {
    NOTIFICATION_RECEIVED,
    NOTIFICATION_WATCHED,
    SET_PRODUCT,
    SET_REVIEW,
    SET_USERS,
    SET_USER,
    SET_CATEGORY, SET_ORDERS, UPDATE_ORDER, SET_ORDER
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    user: {},
    product: {},
    order: {},
    orders: [],
    review: {},
    category: {},
    isNotificationReceived: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }
        case UPDATE_ORDER: {
            return {
                ...state,
                orders: [...state.orders.slice(0, state.orders.findIndex(i => i.id === action.order.id)),
                    action.order, ...state.orders.slice(state.orders.findIndex(i => i.id === action.order.id) + 1)]
            }
        }
        case SET_ORDER: {
            return {
                ...state,
                order: action.order
            }
        }
        case NOTIFICATION_RECEIVED: {
            return {
                ...state,
                isNotificationReceived: true
            }
        }
        case NOTIFICATION_WATCHED: {
            return {
                ...state,
                isNotificationReceived: false
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case SET_PRODUCT: {
            return {
                ...state,
                product: action.product
            }
        }
        case SET_CATEGORY: {
            return {
                ...state,
                category: action.category
            }
        }
        case SET_REVIEW: {
            return {
                ...state,
                review: action.review
            }
        }
        default: {
            return state
        }
    }
};

export default adminReducer;