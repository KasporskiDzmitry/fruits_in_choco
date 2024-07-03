import {CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, INITIALIZED_SUCCESS, REMOVE_SNACKBAR} from "../action_types/app_action_types";

const initialState = {
    initialized: false,
    isSignInSignUpPopUpShow: false,
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