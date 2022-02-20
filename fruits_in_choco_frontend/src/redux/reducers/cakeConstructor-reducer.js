import {SET_CAKE, SET_DATA, TOGGLE_IS_FETCHING} from "../action_types/cakeConstructor_action_types";

const initialState = {
    data: {biscuits: [], fillings: [], decorations: []},
    cake: {},
    isFetching: false
}

const cakeConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_CAKE: {
            return {
                ...state,
                cake: action.cake
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: !state.isFetching
            }
        }
        default: {
            return state;
        }
    }
}

export default cakeConstructorReducer;