import {
    CLOSE_SNACKBAR,
    ENQUEUE_SNACKBAR,
    INITIALIZED_SUCCESS,
    REMOVE_SNACKBAR,
} from '../action_types/app_action_types';

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const enqueueSnackbar = (message, variant) => {
    const key = new Date().getTime() + Math.random();

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            key: key,
            message: message,
            options: {
                key: key,
                variant: variant,
            },
        },
    };
};

export const closeSnackbar = (key) => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = (key) => ({
    type: REMOVE_SNACKBAR,
    key,
});
