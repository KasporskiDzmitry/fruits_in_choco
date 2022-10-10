import {
    ACCEPT_REVIEW_BEGIN,
    ACCEPT_REVIEW_FAILURE,
    ACCEPT_REVIEW_SUCCESS,
    ADD_PRODUCT_BEGIN,
    ADD_PRODUCT_FAILURE,
    ADD_PRODUCT_SUCCESS, ADD_REVIEW_BEGIN, ADD_REVIEW_FAILURE, ADD_REVIEW_SUCCESS,
    DELETE_PRODUCT_BEGIN,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_BEGIN, DELETE_REVIEW_FAILURE, DELETE_REVIEW_SUCCESS,
    FETCH_PRODUCT_BEGIN,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_BEGIN,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_SUCCESS
} from "../action_types/product_action_types";

export const fetchProductsBegin = () => ({type: FETCH_PRODUCTS_BEGIN})
export const fetchProductsSuccess = (products) => ({type: FETCH_PRODUCTS_SUCCESS, products})
export const fetchProductsFailure = (error) => ({type: FETCH_PRODUCTS_FAILURE, error})
export const fetchProductBegin = () => ({type: FETCH_PRODUCT_BEGIN})
export const fetchProductSuccess = (product) => ({type: FETCH_PRODUCT_SUCCESS, product})
export const fetchProductFailure = (error) => ({type: FETCH_PRODUCT_FAILURE, error})
export const addProductBegin = () => ({type: ADD_PRODUCT_BEGIN})
export const addProductSuccess = (product) => ({type: ADD_PRODUCT_SUCCESS, product})
export const addProductFailure = error => ({type: ADD_PRODUCT_FAILURE, error})
export const addReviewBegin = () => ({type: ADD_REVIEW_BEGIN})
export const addReviewSuccess = () => ({type: ADD_REVIEW_SUCCESS})
export const addReviewFailure = error => ({type: ADD_REVIEW_FAILURE, error})
export const deleteProductBegin = () => ({type: DELETE_PRODUCT_BEGIN})
export const deleteProductSuccess = (id) => ({type: DELETE_PRODUCT_SUCCESS, id})
export const deleteProductFailure = error => ({type: DELETE_PRODUCT_FAILURE, error})
export const deleteReviewBegin = () => ({type: DELETE_REVIEW_BEGIN})
export const deleteReviewSuccess = () => ({type: DELETE_REVIEW_SUCCESS})
export const deleteReviewFailure = error => ({type: DELETE_REVIEW_FAILURE, error})
export const acceptReviewBegin = () => ({type: ACCEPT_REVIEW_BEGIN})
export const acceptReviewSuccess = () => ({type: ACCEPT_REVIEW_SUCCESS})
export const acceptReviewFailure = error => ({type: ACCEPT_REVIEW_FAILURE, error})
export const updateProductBegin = () => ({type: UPDATE_PRODUCT_BEGIN})
export const updateProductSuccess = (product) => ({type: UPDATE_PRODUCT_SUCCESS, product})
export const updateProductFailure = error => ({type: UPDATE_PRODUCT_FAILURE, error})
