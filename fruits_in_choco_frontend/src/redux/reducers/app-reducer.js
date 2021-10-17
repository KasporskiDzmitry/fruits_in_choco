import {INITIALIZED_SUCCESS, TOGGLE_POPUP} from "../action_types/app_action_types";

const initialState = {
    pathnames: [
        {path: '/', name: 'Главная'},
        {path: '/shop', name: 'Магазин'}
    ],
    initialized: false,
    isPopUpShow: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case TOGGLE_POPUP: {
            return {
                ...state,
                isPopUpShow: !state.isPopUpShow
            }
        }
        default: {
            return state
        }
    }
};


export default appReducer;