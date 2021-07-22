const SET_SLIDES = 'SET_SLIDES';
const SET_PRODUCTS = 'SET_PRODUCTS';

const initialState = {
    slides: [],
    products: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SLIDES: {
            return {
                ...state,
                slides: action.slides
            }
        }
        case SET_PRODUCTS: {
            return  {
                ...state,
                products: action.products
            }
        }
        default: {
            return state
        }
    }
}


// Actions
const setSlides = slides => ({type: SET_SLIDES, slides });
const setProducts = products => ({type: SET_PRODUCTS, products });


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

export const loadProducts = () => dispatch => {
    dispatch(setProducts([
        {
            imageUrl: 'https://pp.userapi.com/c840327/v840327207/47292/_huo98pQSAU.jpg',
            productType: 'fruits_in_chocolate',
            title: 'Фрукты в шоколаде',
            description: 'Текст о фруктах в шоколаде'
        },
        {
            imageUrl: 'https://img-global.cpcdn.com/recipes/4ea60701b817f7bd/751x532cq70/bystryie-domashniie-kieksy-k-chaiu-pp-vypiechka-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%BE%D0%B5-%D1%84%D0%BE%D1%82%D0%BE-%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82%D0%B0.jpg',
            productType: 'bakery',
            title: 'Выпечка',
            description: 'Текст о выпечке'
        },
        {
            imageUrl: 'https://lh3.googleusercontent.com/proxy/V4Ce8ygHYIg1YHimxwiFQ64Gv6XjFjFxOjR7xMVLC7U1FAhcROnXnlX7eRTdChS-thqcjFb7TmbEO83QXzh_YRUKzhk7h_xUlE69zA01UJL0NJ5c8tCr4O0QuSdURhi93OSF_zo',
            productType: 'bouquets',
            title: 'Подарочные букеты',
            description: 'Текст о подарочных букетах'
        }
    ]))
}

export default mainReducer;