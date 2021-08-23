import RequestService from "./RequestService";

const SET_SLIDES = 'SET_SLIDES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SELECT_CATEGORY = 'SELECT_CATEGORY';

const initialState = {
    slides: [],
    categories: [],
    selectedCategory: 0,

}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDES: {
            return {
                ...state,
                slides: action.slides
            }
        }
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories
            }
        }
        case SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.category
            }
        }

        default: {
            return state
        }
    }
}


// Actions
const setSlides = slides => ({type: SET_SLIDES, slides});
const setCategories= categories => ({type: SET_CATEGORIES, categories});
export const selectCategory = category => ({type: SELECT_CATEGORY, category});


// Thunks
// thunk with promise async
export const loadSlides = () => dispatch => {
    // request to server for images by promise

    dispatch(setSlides([
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Desert_Electric.jpg/1200px-Desert_Electric.jpg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            url: 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            url: 'https://4brain.ru/blog/wp-content/uploads/2017/09/%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            url: 'https://kickscontest.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg',
            title: 'Title',
            subtitle: 'text'
        }
    ]))
}

export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/categories');
        dispatch(setCategories(response.data));
    } catch (e) {
        console.log(e)
    }
};

export default mainReducer;