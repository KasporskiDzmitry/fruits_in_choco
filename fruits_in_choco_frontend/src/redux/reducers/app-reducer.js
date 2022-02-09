import {
    INITIALIZED_SUCCESS,
    TOGGLE_POPUP,
    TOGGLE_CART_LAYOUT,
    TOGGLE_SIGN_IN_SIGN_UP_POPUP, ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR
} from "../action_types/app_action_types";

const initialState = {
    pathnames: [
        {path: '/', name: 'Главная'},
        {path: '/shop', name: 'Магазин'}
    ],
    initialized: false,
    isSignInSignUpPopUpShow: false,
    isCartLayoutShow: false,
    notifications: []
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case TOGGLE_SIGN_IN_SIGN_UP_POPUP: {
            return {
                ...state,
                isSignInSignUpPopUpShow: !state.isSignInSignUpPopUpShow
            }
        }
        case TOGGLE_CART_LAYOUT: {
            return {
                ...state,
                isCartLayoutShow: !state.isCartLayoutShow
            }
        }
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? {...notification, dismissed: true}
                        : {...notification}
                )),
            };

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

        default: {
            return state
        }
    }
};


export default appReducer;