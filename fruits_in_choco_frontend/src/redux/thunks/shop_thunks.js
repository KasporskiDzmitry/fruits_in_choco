import RequestService from "../RequestService";
import {
    addToCart,
    setCurrentProduct,
    setCurrentProductReviews, setIsProductFetching, setIsProductsFetching,
    setProducts
} from "../actions/shop_actions";
import {setProduct} from "../actions/admin_actions";
import {addProductToCart, isProductInCart} from "../../components/utils/localStorageFunctions";

export const loadProducts = () => async dispatch => {
    try {
        dispatch(setIsProductsFetching(true));
        const response = await RequestService.get('/products');
        dispatch(setProducts(response.data));
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setIsProductsFetching(false));
    }
};

export const loadProductById = id => async dispatch => {
    try {
        dispatch(setIsProductFetching(true));
        const response = await RequestService.get(`/products/${id}`);
        dispatch(setCurrentProduct(response.data));
        dispatch(setCurrentProductReviews(response.data.ratings));
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setIsProductFetching(false));
    }
};

export const loadProductsByCategories = (categories) => async dispatch => {
    try {
        const response = await RequestService.post('/products/search', {categories});
        dispatch(setProducts(response.data));
    } catch (e) {
        console.log(e)
    } finally {
    }
};

export const addReview = (review) => async dispatch => {
    const response = await RequestService.post(`/products/${review.productId}/ratings`, review, true);
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.ratings));

    // зачем ??
    // dispatch(getProfile());
};

export const saveProductToCart = (product) => async dispatch => {
    if (!isProductInCart(product.id)) {
        addProductToCart({...product, quantity: 1});
        dispatch(addToCart({...product, quantity: 1}));
    }
}
