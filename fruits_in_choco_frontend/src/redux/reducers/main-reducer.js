import {SET_SLIDES} from "../action_types/main_action_types";

const initialState = {
    slides: []
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDES: {
            return {
                ...state,
                slides: action.slides
            }
        }
        default: {
            return state
        }
    }
};

export default mainReducer;