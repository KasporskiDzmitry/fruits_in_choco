import {SELECT_CATEGORY, SET_CATEGORIES, SET_SLIDES} from "../action_types/main_action_types";

const initialState = {
    slides: [],
    categories: [],
    selectedCategory: 0,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDES: {
            return {
                ...state,
                slides: action.slides
            }
        }
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

        default: {
            return state
        }
    }
};

export default mainReducer;