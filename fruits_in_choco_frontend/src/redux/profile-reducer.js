import RequestService from "./RequestService";

const SET_PROFILE = 'SET_PROFILE';

const initialState = {
    profile: {}
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default: {
            return state
        }

    }
};

export const setProfile = (profile) => ({type: SET_PROFILE, profile});


export const getProfile = () => async dispatch => {
    try {
        const response = await RequestService.get(`/profile`, true);
        // dispatch(setProfile(data.data));
    } catch (e) {
        console.log(e.response.data);
    }
};

export default profileReducer;