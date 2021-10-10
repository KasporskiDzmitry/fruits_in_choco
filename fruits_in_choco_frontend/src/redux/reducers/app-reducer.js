import {INITIALIZED_SUCCESS} from "../action_types/app_action_types";

const initialState = {
    pathnames: [
        {path: '/', name: 'Главная'},
        {path: '/shop', name: 'Магазин'}
    ],
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
};


export default appReducer;