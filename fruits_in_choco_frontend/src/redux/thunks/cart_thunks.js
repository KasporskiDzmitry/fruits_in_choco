import {addProductToCart, isProductInCart, removeProductFromCart} from "../../components/utils/localStorageFunctions";
import RequestService from "../RequestService";
import {addToCart, removeFromCart} from "../actions/cart_actions";

export const saveProductToCart = (product) => async dispatch => {
    const productDTO = {...product, quantity: 1}
    if (!isProductInCart(product.id)) {
        addProductToCart(productDTO);
        dispatch(addToCart(productDTO));

        if (localStorage.name) {
            try {
                const response = await RequestService.post('/profile/cart', productDTO, true);
            } catch (e) {
                console.log(e)
            }
        }
    }
}

export const deleteFromCart = (id) => async dispatch => {
    if (localStorage.name) {
        try {
            const response = await RequestService.delete(`/profile/cart/${id}`,true)
        } catch (e) {
            console.log(e);
        }
    }

    removeProductFromCart(id);
    dispatch(removeFromCart(id));
}

export const synchronizeCarts = (cart) => async dispatch => {
    const cartFromDB = cart.cartItems.map(i => ({...i.product, quantity: i.quantity}));


    let productsInLS = localStorage.products;
    let products = [];
    if (productsInLS) {
        products = Array.from(JSON.parse(productsInLS));

        for (let i = 0; i < products.length; i++) {
            if (!cartFromDB.find(p => p.id === products[i].id)) {
                const response = await RequestService.post('/profile/cart', products[i], true)
            }
        }
    }

    for (let i = 0; i < cartFromDB.length; i++) {
        if (!isProductInCart(cartFromDB[i].id)) {
            addProductToCart(cartFromDB[i]);
        }
    }
}
