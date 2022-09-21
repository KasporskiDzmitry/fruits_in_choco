import {
    NOTIFICATION_RECEIVED,
    NOTIFICATION_WATCHED,
    SET_CATEGORY,
    SET_ORDER,
    SET_ORDERS,
    SET_PRODUCT,
    SET_REVIEW,
    SET_USER,
    SET_USERS,
    UPDATE_ORDER
} from "../action_types/admin_action_types";

const initialState = {
    users: [],
    user: {},
    product: {},
    order: {},
    orders: [],
    review: {},
    category: {},
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