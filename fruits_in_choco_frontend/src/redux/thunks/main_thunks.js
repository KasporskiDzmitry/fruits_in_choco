import RequestService from "../RequestService";
import {setCategories, setSlides} from "../actions/main_actions";
import {setFilteredTypes} from "../actions/shop_actions";

export const loadSlides = () => dispatch => {
    // request to server for images by promise

    dispatch(setSlides([
        {
            id: 1,
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Desert_Electric.jpg/1200px-Desert_Electric.jpg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            id: 2,
            url: 'https://natworld.info/wp-content/uploads/2018/01/%D0%A1%D0%BE%D1%87%D0%B8%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D1%82%D0%B5%D0%BC%D1%83-%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpeg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            id: 3,
            url: 'https://4brain.ru/blog/wp-content/uploads/2017/09/%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0.jpg',
            title: 'Title',
            subtitle: 'text'
        },
        {
            id: 4,
            url: 'https://kickscontest.ru/wp-content/uploads/sochinenie-rassuzhdenie-priroda-rodnogo-kraya-9-klass.jpg',
            title: 'Title',
            subtitle: 'text'
        }
    ]))
};

export const loadCategories = () => async dispatch => {
    try {
        const response = await RequestService.get('/category');
        console.log(response.data)
        dispatch(setCategories(response.data));
        dispatch(setFilteredTypes(response.data.map(i => i.types).flat().map(i => i.id)));
    } catch (e) {
        console.log(e)
    }
};