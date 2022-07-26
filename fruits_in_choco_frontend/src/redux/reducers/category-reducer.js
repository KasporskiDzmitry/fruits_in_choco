import {
    SET_CATEGORIES,
    SELECT_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY
} from "../action_types/category_action_types";

const initialState = {
    categories: [],
    selectedCategory: 0
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            }
        }
        case DELETE_CATEGORY: {
            return {
                ...state,
                categories: state.categories.filter(i => i.id !== action.id)
            }
        }
        case SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.category
            }
        }
        case UPDATE_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories.slice(0, state.categories.findIndex(i => i.id === action.category.id)),
                    action.category, ...state.categories.slice(state.categories.findIndex(i => i.id === action.category.id) + 1)]
            }
        }
        default: {
            return state;
        }
    }
}

export default categoryReducer;