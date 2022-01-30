import {ORDER_MADE_SUCCESS, TOGGLE_IS_FETCHING} from "../action_types/order_action_types";

const initialState = {
    order: {},
    orders: [],
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
        default: {
            return state
        }
    }
};

export default orderReducer;