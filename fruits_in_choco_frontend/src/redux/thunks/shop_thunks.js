import RequestService from "../RequestService";
import {
    setCurrentProduct,
    setCurrentProductReviews,
    setProducts,
    toggleIsFetching
} from "../actions/shop_actions";
import {setProduct} from "../actions/admin_actions";

export const loadProducts = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get('/product');
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
};

export const loadProductById = id => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.get(`/product/${id}`);
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.ratings));
    dispatch(setProduct(response.data));
    dispatch(toggleIsFetching(false));
};

export const loadProductsByTypes = (types) => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await RequestService.post('/product/search', {types});
    dispatch(toggleIsFetching(false));
    dispatch(setProducts(response.data));
};

export const addReview = (review) => async dispatch => {
    const response = await RequestService.post(`/product/${review.productId}/rateProduct`, review, true);
    dispatch(setCurrentProduct(response.data));
    dispatch(setCurrentProductReviews(response.data.ratings));

    // зачем ??
    // dispatch(getProfile());
};
