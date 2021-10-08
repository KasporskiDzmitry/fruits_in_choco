import RequestService from "./RequestService";

export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    isRegistered: false,
    isFetching: false,
    errors: {}
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                isRegistered: true
            };
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                errors: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};


const registerSuccess = () => ({type: REGISTER_SUCCESS});
const registerFailure = errors => ({type: REGISTER_FAILURE, payload: errors});
const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});

export const registration = user => async dispatch => {
    try {
        dispatch(toggleIsFetching(true));
        await RequestService.post("/registration", user);
        dispatch(toggleIsFetching(false));
        dispatch(registerSuccess());
        window.location.href = '/login';
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    }
};
