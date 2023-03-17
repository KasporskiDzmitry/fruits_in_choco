import {
    addProductToCart, decreaseQuantity,
    increaseQuantity,
    isProductInCart,
    removeProductFromCart
} from "../../components/utils/localStorageFunctions";
import RequestService from "../RequestService";
import {
    addToCartLocally,
    addToCartBegin,
    addToCartFailure,
    addToCartSuccess,
    deleteFromCartBegin, deleteFromCartFailure, deleteFromCartSuccess,
    removeFromCartLocally, updateProductInCart, updateServerCartBegin, updateServerCartSuccess, updateServerCartFailure
} from "../actions/cart_actions";

const postToServerCart = (product) => async dispatch => {
    try {
        dispatch(addToCartBegin());
        const response = await RequestService.post('/profile/cart', product, true);
        dispatch(addToCartSuccess());
    } catch (e) {
        console.log(e);
        dispatch(addToCartFailure(e));
    }
}

const updateServerCart = (product) => async dispatch => {
    try {
        dispatch(updateServerCartBegin());
        const response = await RequestService.put('/profile/cart', product, true);
        dispatch(updateServerCartSuccess());
    } catch (e) {
        console.log(e);
        dispatch(updateServerCartFailure(e));
    }
}

export const saveProductToCart = (product) => async dispatch => {
    const productDTO = {...product, quantity: 1}
    if (!isProductInCart(product.id)) {
        addProductToCart(productDTO);
        dispatch(addToCartLocally(productDTO));

        if (localStorage.name) {
            dispatch(postToServerCart(productDTO));
        }
    }
}

export const deleteFromCart = (id) => async dispatch => {
    if (localStorage.name) {
        try {
            dispatch(deleteFromCartBegin());
            const response = await RequestService.delete(`/profile/cart/${id}`,true)
            dispatch(deleteFromCartSuccess());
        } catch (e) {
            console.log(e);
            dispatch(deleteFromCartFailure(e));
        }
    }

    removeProductFromCart(id);
    dispatch(removeFromCartLocally(id));
}

export const synchronizeCarts = (cart) => async dispatch => {
    const cartFromDB = cart.cartItems.map(i => ({...i.product, quantity: i.quantity}));

    let productsInLS = localStorage.products;
    let products = [];
    if (productsInLS) {
        products = Array.from(JSON.parse(productsInLS));

        for (let i = 0; i < products.length; i++) {
            if (!cartFromDB.find(p => p.id === products[i].id)) {
                dispatch(postToServerCart(products[i]));
            }
        }
    }

    for (let i = 0; i < cartFromDB.length; i++) {
        if (!isProductInCart(cartFromDB[i].id)) {
            addProductToCart(cartFromDB[i]);
        }
    }
}

export const incrProduct = (product) => dispatch => {
    increaseQuantity(product.id);
    const productToUpdate = {...product, quantity: product.quantity + 1}
    dispatch(updateProductInCart(productToUpdate));
    if (localStorage.name) {
        dispatch(updateServerCart(productToUpdate))
    }
}

export const decrProduct = (product) => dispatch => {
    if (product.quantity > 1) {
        decreaseQuantity(product.id);
        const productToUpdate = {...product, quantity: product.quantity - 1}
        dispatch(updateProductInCart(productToUpdate));
        if (localStorage.name) {
            dispatch(updateServerCart(productToUpdate))
        }
    }
}

