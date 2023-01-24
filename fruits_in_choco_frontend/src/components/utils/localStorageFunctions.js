export const addProductToCart = (product) => {
    const products = localStorage.products;
    if (products) {
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify([...Array.from(JSON.parse(products)), product]));
    } else {
        localStorage.setItem('products', JSON.stringify([product]));
    }
}

export const increaseQuantity = (id) => {
    const products = localStorage.products;
    localStorage.removeItem('products');
    const productsArray = Array.from(JSON.parse(products));
    const product = productsArray.find(i => i.id === id);
    product.quantity += 1;
    localStorage.setItem('products', JSON.stringify(productsArray));
}

export const decreaseQuantity = (id) => {
    const products = localStorage.products;
    const productsArray = Array.from(JSON.parse(products));
    const product = productsArray.find(i => i.id === id);
    product.quantity -= 1;
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(productsArray));
}

export const removeProductFromCart = (id) => {
    const products = localStorage.products;
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(Array.from(JSON.parse(products)).filter(i => i.id !== id)));
}

export const isProductInCart = (id) => {
    const products = localStorage.products;
    if (products) {
        return !!Array.from(JSON.parse(products)).find(i => i.id === id);
    } else {
        return false;
    }
}

export const saveUserInfoToLS = (user) => {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('isAuth', 'true');
}

export const removeUserInfoFromLS = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('products');
    localStorage.removeItem('isAuth');
}

