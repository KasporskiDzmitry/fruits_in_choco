import {SET_PRODUCTS} from "../action_types/filter_action_types";

const initialState = {
    products: []
}

const filterReducer = (state = initialState, action) => {
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

export default filterReducer;