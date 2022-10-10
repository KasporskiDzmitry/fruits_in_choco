import {addProductToCart, isProductInCart, removeProductFromCart} from "../../components/utils/localStorageFunctions";
import RequestService from "../RequestService";
import {
    addToCartBegin,
    addToCartFailure,
    addToCartLocally,
    addToCartSuccess, deleteFromCartBegin, deleteFromCartFailure, deleteFromCartSuccess,
    removeFromCartLocally
} from "../actions/cart_actions";

const postToServerCart = (product) => async dispatch => {
    try {
        dispatch(addToCartBegin());
        const response = await RequestService.post('/profile/cart', product, true);
        dispatch(addToCartSuccess());
    } catch (e) {
        console.log(e)
        dispatch(addToCartFailure(e));
    }
}

export const saveProductToCart = (product) => async dispatch => {
    const productDTO = {...product, quantity: 1}
    if (!isProductInCart(product.id)) {
        addProductToCart(productDTO);
        dispatch(addToCartLocally(productDTO));

        if (localStorage.name) {
            postToServerCart(productDTO);
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
                postToServerCart(products[i]);
            }
        }
    }

    for (let i = 0; i < cartFromDB.length; i++) {
        if (!isProductInCart(cartFromDB[i].id)) {
            addProductToCart(cartFromDB[i]);
        }
    }
}
