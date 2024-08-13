const initialState = {
    isModalOpen: false,
};

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                isModalOpen: true,
            };
        }
        case CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
            };
        default: {
            return state;
        }
    }
};

export default modalReducer;
