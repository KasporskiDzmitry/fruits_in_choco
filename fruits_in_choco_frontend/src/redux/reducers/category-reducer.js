import {SET_CATEGORIES, SELECT_CATEGORY, SET_CATEGORY, DELETE_CATEGORY} from "../action_types/category_action_types";

const initialState = {
    categories: [],
    category: {},
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
        case SET_CATEGORY: {
            return {
                ...state,
                category: action.category
            }
        }
        default: {
            return state;
        }
    }
}

export default categoryReducer;