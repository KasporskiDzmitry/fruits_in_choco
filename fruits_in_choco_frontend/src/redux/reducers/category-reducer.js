const {SET_CATEGORIES, SELECT_CATEGORY, SET_CATEGORY} = require("../action_types/category_action_types");

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