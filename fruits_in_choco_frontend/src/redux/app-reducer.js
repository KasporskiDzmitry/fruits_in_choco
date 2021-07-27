import RequestService from "./RequestService";

const SET_CATEGORIES = 'SET_CATEGORIES';

const initialState = {
    categories: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            }
        }
        default: {
            return state
        }
    }
}

const setCategories= categories => ({type: SET_CATEGORIES, categories});


export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/categories');
        console.log(123)
        dispatch(setCategories(response.data));
    } catch (e) {
        console.log(e)
    }
};


export default appReducer;