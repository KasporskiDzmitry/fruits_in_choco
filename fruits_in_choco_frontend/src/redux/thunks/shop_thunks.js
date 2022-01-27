import RequestService from "../RequestService";
import {
    addToCart,
    setCurrentProduct,
    setCurrentProductReviews,
    setProducts,
    toggleIsFetching
} from "../actions/shop_actions";
import {setProduct} from "../actions/admin_actions";
import {addProductToCart, isProductInCart} from "../../components/utils/localStorageFunctions";

export const loadProducts = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/products');
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
};

export const loadProductById = id => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get(`/products/${id}`);
    dispatch(toggleIsFetching(false));
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.ratings));
    dispatch(setProduct(response.data));
};

export const loadProductsByTypes = (types) => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.post('/products/search', {types});
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
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
        dispatch(addToCart({...product, quantity: 1}));
        addProductToCart({...product, quantity: 1});
    }
}
