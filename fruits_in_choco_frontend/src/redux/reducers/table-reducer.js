import {SET_CURRENT_PAGE, SET_DATA} from "../action_types/table_action_types";

const initialState = {
    data: [],
    currentPage: 0
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        default: {
            return state;
        }
    }
}

export default tableReducer;